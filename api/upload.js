import upload from '@/utils/upload.js'
 
export function uploadFile(data) {
  return upload({
    url: '/file/upload',
    method: 'post',
    data: data
  })
}