const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const morgan = require('morgan')
const app = express()
const fs = require('fs')
const path = require('path')

app.use(bodyparser.json())
app.use(cors())
app.use(morgan('combined'))

var dpath = path.join(__dirname, 'fuckit.txt')

var djson = [
  { password: '123',
    email: 'femi@gmail.com'
  },
  { password: '456',
    email: 'bemi@gmail.com'
  },
  { password: '789',
    email: 'faith.eriaye@gmail.com'
  },
  { password: '890',
    email: 'demi@gmail.com'
  },
  { password: '901',
    email: 'kemi@gmail.com'
  }
]



function checklist (email, password) {
  var feed = ''
  // var k = djson.includes(djson)
  for (var i = 0; i < djson.length; i++) {
    if (djson[i].email === email && djson[i].password === password) {
      feed = 'found'
      console.log(feed)
      break
    } else {
      feed = 'not found'
      console.log(feed)
    }
  }
  return feed
}

app.get('/', (req, res, next) => {
  console.log('endpoint home')
})

app.post('/register', (req, res) => {
  console.log(req.body.email, req.body.password)
  var stats = checklist(req.body.email, req.body.password)
  if (stats === 'found') {
    res.json({ message: `welcome ${req.body.email}!` })
  } else { res.json({ message: stats }) }
})

app.post('/adduser', (req, res) => {
  djson.push({ password: `${req.body.newpass}`, email: `${req.body.newuser}` })
  res.json({ message: `User Added! ${req.body.newuser}!` })
  fs.writeFile(dpath, JSON.stringify(djson), (error) => {
    console.log(error)
  })
})

app.listen(8083, console.log('listening to port 8083'))
