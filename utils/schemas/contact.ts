import * as z from 'zod'

const collabSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z
    .string()
    .min(6, 'Subject must be at least 6 characters')
    .max(50, 'Subject must be at most 50 characters'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must be at most 1000 characters'),
  collabRequestUrl: z
    .string()
    .url('Please enter a valid URL')
    .refine(url => {
      try {
        const urlObj = new URL(url)
        const host = urlObj.hostname
        const validDomains = [
          'soundcloud.com',
          'on.soundcloud.com',
          'youtu.be',
          'www.youtube.com',
          'youtube.com',
          'open.spotify.com',
          'www.dropbox.com',
        ]
        return validDomains.some(domain => host.includes(domain))
      } catch (_) {
        return false
      }
    }, 'Please enter a valid link from Spotify, SoundCloud, YouTube, or Dropbox'),
})

const nonCollabSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z
    .string()
    .min(6, 'Subject must be at least 6 characters')
    .max(50, 'Subject must be at most 50 characters'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must be at most 1000 characters'),
  collabRequestUrl: z.string().url('Please enter a valid URL').optional(),
})

export { collabSchema, nonCollabSchema }
