import { useState, useEffect } from 'react';

interface UserDataLog {
  timestamp: Date;
  action: 'data_collected' | 'data_processed' | 'data_deleted' | 'consent_given' | 'consent_withdrawn';
  dataType: string;
  purpose: string;
  legalBasis: 'consent' | 'legitimate_interest' | 'contract' | 'legal_obligation';
}

interface GDPRState {
  consentGiven: boolean;
  dataProcessingLog: UserDataLog[];
  retentionPeriod: number; // days
  lastConsentUpdate: Date | null;
}

const GDPR_STORAGE_KEY = 'tim-gdpr-compliance';
const DEFAULT_RETENTION_DAYS = 365; // 1 year default retention

export const useGDPRCompliance = () => {
  const [gdprState, setGdprState] = useState<GDPRState>({
    consentGiven: false,
    dataProcessingLog: [],
    retentionPeriod: DEFAULT_RETENTION_DAYS,
    lastConsentUpdate: null
  });

  useEffect(() => {
    const saved = localStorage.getItem(GDPR_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGdprState({
          ...parsed,
          lastConsentUpdate: parsed.lastConsentUpdate ? new Date(parsed.lastConsentUpdate) : null,
          dataProcessingLog: parsed.dataProcessingLog.map((log: any) => ({
            ...log,
            timestamp: new Date(log.timestamp)
          }))
        });
      } catch (error) {
        console.error('Failed to parse GDPR state:', error);
      }
    }
  }, []);

  const saveGDPRState = (newState: GDPRState) => {
    setGdprState(newState);
    localStorage.setItem(GDPR_STORAGE_KEY, JSON.stringify(newState));
  };

  const logDataProcessing = (
    action: UserDataLog['action'], 
    dataType: string, 
    purpose: string, 
    legalBasis: UserDataLog['legalBasis'] = 'consent'
  ) => {
    const logEntry: UserDataLog = {
      timestamp: new Date(),
      action,
      dataType,
      purpose,
      legalBasis
    };

    const newState = {
      ...gdprState,
      dataProcessingLog: [...gdprState.dataProcessingLog, logEntry]
    };

    saveGDPRState(newState);
  };

  const giveConsent = () => {
    const newState = {
      ...gdprState,
      consentGiven: true,
      lastConsentUpdate: new Date()
    };
    saveGDPRState(newState);
    logDataProcessing('consent_given', 'user_profile', 'authentication_and_personalization');
  };

  const withdrawConsent = () => {
    const newState = {
      ...gdprState,
      consentGiven: false,
      lastConsentUpdate: new Date()
    };
    saveGDPRState(newState);
    logDataProcessing('consent_withdrawn', 'user_profile', 'user_request');
  };

  const requestDataDeletion = () => {
    // Clear all local data
    localStorage.removeItem(GDPR_STORAGE_KEY);
    localStorage.removeItem('tim-bookmarks');
    
    // Log the deletion
    logDataProcessing('data_deleted', 'all_user_data', 'user_request');
    
    // Reset state
    setGdprState({
      consentGiven: false,
      dataProcessingLog: [],
      retentionPeriod: DEFAULT_RETENTION_DAYS,
      lastConsentUpdate: null
    });
  };

  const getDataPortability = () => {
    // Return all user data in a portable format
    const userData = {
      gdprState,
      bookmarks: localStorage.getItem('tim-bookmarks'),
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    logDataProcessing('data_processed', 'all_user_data', 'data_portability_request', 'legal_obligation');
    
    return userData;
  };

  const isConsentExpired = () => {
    if (!gdprState.lastConsentUpdate) return true;
    
    const daysSinceConsent = Math.floor(
      (Date.now() - gdprState.lastConsentUpdate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return daysSinceConsent > 365; // Consent expires after 1 year
  };

  const shouldRetainData = (dataDate: Date) => {
    const daysOld = Math.floor(
      (Date.now() - dataDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return daysOld <= gdprState.retentionPeriod;
  };

  return {
    gdprState,
    giveConsent,
    withdrawConsent,
    requestDataDeletion,
    getDataPortability,
    logDataProcessing,
    isConsentExpired,
    shouldRetainData,
    consentRequired: !gdprState.consentGiven || isConsentExpired()
  };
};