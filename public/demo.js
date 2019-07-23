const exportExelComponent = new Vue({
  el: '#excel',
  data: {
    cols: ['name', 'col1', 'col2'],
    inputs: ['', '', ''],
    data: [
      { name: 'N1', col1: 'V1', col2: 'V2' }
    ],
    loaded: true
  },
  methods: {
    add () {
      this.data.push({
        name: this.inputs[0] || 'default',
        col1: this.inputs[1] || 'default',
        col2: this.inputs[2] || 'default'
      })
      this.inputs = ['', '', '']
    },
    remove (i) {
      this.data.splice(i, 1)
    },
    exportFile () {
      // Method 1 (Not good)
      // const data = encodeURI(JSON.stringify(this.data))
      // const url = `/export/excel?data=${data}`
      // window.open(url, '_blank')
      // Method 2
      const url = '/export/excel'
      this.loaded = false
      fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          data: this.data
        })
      })
        .then(res => {
          if (res.ok) return res.blob()
          else return Promise.reject(new Error(res.statusText))
        })
        .then(blob => {
          const tempLink = URL.createObjectURL(blob)
          const a = document.createElement('A')
          a.download = 'output.xlsx'
          a.href = tempLink
          a.click()
          URL.revokeObjectURL(tempLink)
        })
        .catch(e => {
          console.log(e.message)
        })
        .finally(() => {
          this.loaded = true
        })
    }
  }
})
