const api = {
  hostname: 'https://api.github.com/repos/',
  async getToken(code: string, client_id: string, client_secret: string) {
    const response = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
      {
        method: 'POST'
      }
    )
    return await response.json()
  }
}

export default api
