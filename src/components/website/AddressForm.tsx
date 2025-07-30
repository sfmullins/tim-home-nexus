import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddressFormProps {
  title: string;
  address: any;
  onChange: (address: any) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ title, address, onChange }) => {
  const updateField = (field: string, value: string) => {
    onChange({ ...address, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${title}-firstName`}>First Name</Label>
            <Input
              id={`${title}-firstName`}
              value={address?.firstName || ''}
              onChange={(e) => updateField('firstName', e.target.value)}
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${title}-lastName`}>Last Name</Label>
            <Input
              id={`${title}-lastName`}
              value={address?.lastName || ''}
              onChange={(e) => updateField('lastName', e.target.value)}
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${title}-email`}>Email</Label>
          <Input
            id={`${title}-email`}
            type="email"
            value={address?.email || ''}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="john.doe@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${title}-address1`}>Address Line 1</Label>
          <Input
            id={`${title}-address1`}
            value={address?.address1 || ''}
            onChange={(e) => updateField('address1', e.target.value)}
            placeholder="123 Main Street"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${title}-address2`}>Address Line 2 (Optional)</Label>
          <Input
            id={`${title}-address2`}
            value={address?.address2 || ''}
            onChange={(e) => updateField('address2', e.target.value)}
            placeholder="Apartment, suite, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${title}-city`}>City</Label>
            <Input
              id={`${title}-city`}
              value={address?.city || ''}
              onChange={(e) => updateField('city', e.target.value)}
              placeholder="Dublin"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${title}-state`}>State/Province</Label>
            <Input
              id={`${title}-state`}
              value={address?.state || ''}
              onChange={(e) => updateField('state', e.target.value)}
              placeholder="Leinster"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${title}-zipCode`}>Postal Code</Label>
            <Input
              id={`${title}-zipCode`}
              value={address?.zipCode || ''}
              onChange={(e) => updateField('zipCode', e.target.value)}
              placeholder="D01 123"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${title}-country`}>Country</Label>
          <Select value={address?.country || ''} onValueChange={(value) => updateField('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IE">Ireland</SelectItem>
              <SelectItem value="GB">United Kingdom</SelectItem>
              <SelectItem value="DE">Germany</SelectItem>
              <SelectItem value="FR">France</SelectItem>
              <SelectItem value="ES">Spain</SelectItem>
              <SelectItem value="IT">Italy</SelectItem>
              <SelectItem value="NL">Netherlands</SelectItem>
              <SelectItem value="BE">Belgium</SelectItem>
              <SelectItem value="AT">Austria</SelectItem>
              <SelectItem value="CH">Switzerland</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressForm;