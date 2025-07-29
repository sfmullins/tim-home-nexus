import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface FileRequest {
  action: 'list' | 'download' | 'upload' | 'delete' | 'rename'
  path: string
  file?: File
  newPath?: string
}

interface FileItem {
  name: string
  type: "folder" | "file"
  size?: number
  sizeFormatted?: string
  modified: string
  extension?: string
  path: string
  mimeType?: string
  isSymlink?: boolean
  permissions?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get the authorization header and verify user
    const authHeader = req.headers.get('Authorization')!
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      throw new Error('Unauthorized')
    }

    const requestBody: FileRequest = await req.json()
    const { action, path } = requestBody

    // Log the file access attempt
    const logData = {
      user_id: user.id,
      file_path: path,
      action: action,
      ip_address: req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown',
      user_agent: req.headers.get('user-agent') || 'unknown',
      success: true,
      error_message: null
    }

    try {
      let result: any = {}

      switch (action) {
        case 'list':
          result = await listDirectory(path)
          break
        case 'download':
          result = await downloadFile(path)
          break
        case 'upload':
          if (!requestBody.file) throw new Error('No file provided')
          result = await uploadFile(path, requestBody.file)
          break
        case 'delete':
          result = await deleteFile(path)
          break
        case 'rename':
          if (!requestBody.newPath) throw new Error('No new path provided')
          result = await renameFile(path, requestBody.newPath)
          break
        default:
          throw new Error(`Unknown action: ${action}`)
      }

      // Log successful operation
      await supabase.from('file_access_logs').insert(logData)

      return new Response(
        JSON.stringify(result),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    } catch (error) {
      // Log failed operation
      logData.success = false
      logData.error_message = error.message
      await supabase.from('file_access_logs').insert(logData)
      throw error
    }

  } catch (error) {
    console.error('File server error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        files: [] 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})

async function listDirectory(dirPath: string): Promise<{ files: FileItem[], currentPath: string }> {
  // Mock implementation - in a real deployment, this would read from actual filesystem
  // You would need to configure your server to access local files or use a cloud storage service
  
  const mockFiles: Record<string, FileItem[]> = {
    "/": [
      {
        name: "Documents",
        type: "folder",
        modified: new Date().toISOString(),
        path: "/Documents"
      },
      {
        name: "Pictures", 
        type: "folder",
        modified: new Date().toISOString(),
        path: "/Pictures"
      },
      {
        name: "Downloads",
        type: "folder", 
        modified: new Date().toISOString(),
        path: "/Downloads"
      },
      {
        name: "Music",
        type: "folder",
        modified: new Date().toISOString(), 
        path: "/Music"
      },
      {
        name: "example.txt",
        type: "file",
        size: 1024,
        sizeFormatted: "1 KB",
        modified: new Date().toISOString(),
        extension: "txt",
        path: "/example.txt",
        mimeType: "text/plain"
      }
    ],
    "/Documents": [
      {
        name: "Work",
        type: "folder",
        modified: new Date().toISOString(),
        path: "/Documents/Work"
      },
      {
        name: "Personal",
        type: "folder", 
        modified: new Date().toISOString(),
        path: "/Documents/Personal"
      },
      {
        name: "report.pdf",
        type: "file",
        size: 2560000,
        sizeFormatted: "2.5 MB",
        modified: new Date().toISOString(),
        extension: "pdf",
        path: "/Documents/report.pdf",
        mimeType: "application/pdf"
      }
    ],
    "/Pictures": [
      {
        name: "vacation.jpg",
        type: "file",
        size: 5242880,
        sizeFormatted: "5 MB", 
        modified: new Date().toISOString(),
        extension: "jpg",
        path: "/Pictures/vacation.jpg",
        mimeType: "image/jpeg"
      },
      {
        name: "sunset.png",
        type: "file",
        size: 3145728,
        sizeFormatted: "3 MB",
        modified: new Date().toISOString(),
        extension: "png", 
        path: "/Pictures/sunset.png",
        mimeType: "image/png"
      }
    ],
    "/Downloads": [
      {
        name: "software.zip",
        type: "file",
        size: 104857600,
        sizeFormatted: "100 MB",
        modified: new Date().toISOString(),
        extension: "zip",
        path: "/Downloads/software.zip",
        mimeType: "application/zip"
      }
    ],
    "/Music": [
      {
        name: "album1",
        type: "folder",
        modified: new Date().toISOString(),
        path: "/Music/album1"
      },
      {
        name: "song.mp3",
        type: "file",
        size: 7340032,
        sizeFormatted: "7 MB",
        modified: new Date().toISOString(),
        extension: "mp3",
        path: "/Music/song.mp3",
        mimeType: "audio/mpeg"
      }
    ]
  }

  const files = mockFiles[dirPath] || []
  
  return {
    files,
    currentPath: dirPath
  }
}

async function downloadFile(filePath: string): Promise<Uint8Array> {
  // Mock file content - in a real implementation, this would read the actual file
  const mockContent = `Mock content for file: ${filePath}\nGenerated at: ${new Date().toISOString()}`
  return new TextEncoder().encode(mockContent)
}

async function uploadFile(dirPath: string, file: File): Promise<{ success: boolean }> {
  // Mock upload - in a real implementation, this would save the file to filesystem or cloud storage
  console.log(`Mock upload: ${file.name} to ${dirPath}`)
  return { success: true }
}

async function deleteFile(filePath: string): Promise<{ success: boolean }> {
  // Mock delete - in a real implementation, this would delete the actual file
  console.log(`Mock delete: ${filePath}`)
  return { success: true }
}

async function renameFile(oldPath: string, newPath: string): Promise<{ success: boolean }> {
  // Mock rename - in a real implementation, this would rename the actual file
  console.log(`Mock rename: ${oldPath} to ${newPath}`)
  return { success: true }
}