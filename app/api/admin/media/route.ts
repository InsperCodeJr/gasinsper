/** Envio de imagens, GIFs e videos usados no site. */
import { uploadMedia } from '@/lib/contentStore'
import { hasAdminAccess } from '@/lib/session'

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const MAX_VIDEO_BYTES = 60 * 1024 * 1024

const EXTENSION_BY_TYPE: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'video/mp4': '.mp4',
  'video/webm': '.webm',
}

export async function POST(request: Request) {
  if (!(await hasAdminAccess())) {
    return Response.json({ error: 'Acesso não autorizado.' }, { status: 401 })
  }

  const form = await request.formData()
  const file = form.get('file')

  if (!(file instanceof File)) {
    return Response.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 })
  }

  const extension = EXTENSION_BY_TYPE[file.type]
  if (!extension) {
    return Response.json(
      { error: 'Formato não suportado. Use PNG, JPG, WEBP, GIF, SVG, MP4 ou WEBM.' },
      { status: 400 }
    )
  }

  const isVideo = file.type.startsWith('video/')
  const limit = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES
  if (file.size > limit) {
    return Response.json(
      { error: `O arquivo precisa ter no máximo ${isVideo ? '60' : '5'} MB.` },
      { status: 400 }
    )
  }

  const safeName = (file.name || 'arquivo')
    .replace(/\.[^.]*$/, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40)

  const fileName = `${safeName || 'arquivo'}-${Date.now()}${extension}`
  const uploaded = await uploadMedia(fileName, Buffer.from(await file.arrayBuffer()), file.type)

  return Response.json(uploaded)
}
