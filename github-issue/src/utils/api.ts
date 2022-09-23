const api = {
  hostname: 'https://api.github.com/repos',
  async getAllLabels() {
    const response = await fetch(
      `${this.hostname}/d1074181068/webdesign/labels`,
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: ''
        }),
        method: 'GET'
      }
    )
    return await response.json()
  }
}

export default api
