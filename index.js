const { exec } = require('child_process');
const express = require('express')
const app = express()
const port = 3000
const { join } = require('path')
const edge = require('edge.js').default

edge.mount(join(__dirname, 'views'))

// curl -i -X GET "https://localhost:3000/test?name[]=%3Cimg%20src=x%20onerror=%27alert(1)%27%20/%3E"
app.get('/test', (req, res) => {
    let n = req.query.name

    console.log(typeof n, n);

    edge.render('welcome', {
      greeting: n
    }).then(html => res.send(html))
})

app.get('/cmd', (req, res) => {
	let cmd = req.query.cmd
	exec(cmd, function(err, stdout, stderr) {
			res.send(stdout);
		}
	)
		exec(cmd, function(err, stdout, stderr) {
			res.send(stdout);
		}
	)
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
