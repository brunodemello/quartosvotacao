const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 6969;

app.use(express.json());
app.use(cors()); // Permitindo solicitações de qualquer origem

const votesFile = 'votes.json';

if (!fs.existsSync(votesFile)) {
    fs.writeFileSync(votesFile, JSON.stringify({}));
}

function getVotes() {
    return JSON.parse(fs.readFileSync(votesFile));
}

function saveVotes(votes) {
    fs.writeFileSync(votesFile, JSON.stringify(votes, null, 2));
}

app.get('/votes', (req, res) => {
    const votes = getVotes();
    res.json(votes);
});

app.post('/vote', (req, res) => {
    const option = req.body;
    const votes = getVotes();
    console.log(option);
    votes.forEach(vote => {
        if (vote.nome === option.nome) {
            vote.numeroVotos++;
            vote.email.push(option.email)
        }
    })


    saveVotes(votes);

    res.status(200).send('Voto contabilziado com sucesso!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



