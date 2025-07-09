const express = require('express');
const server = express();

server.use(express.json());

const cursos = ['FullStack Master', 'Desenvolvimento de Games', 'Viver de Youtube'];

// Middleware para validar se o índice do curso existe
function checkCursoExists(req, res, next) {
    const { index } = req.params;
    if (!cursos[index]) {
        return res.status(404).json({ error: 'Curso não encontrado.' });
    }
    return next();
}

// Middleware para validar se o corpo da requisição tem "name"
function checkCursoName(req, res, next) {
    const { name } = req.body;
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Nome do curso é obrigatório.' });
    }
    return next();
}

// Retorna um curso
server.get('/cursos/:index', checkCursoExists, (req, res) => {
    const { index } = req.params;
    return res.json({ curso: cursos[index] });
});

// Retorna todos os cursos
server.get('/cursos', (req, res) => {
    return res.json({ cursos });
});

// Criar um novo curso
server.post('/cursos', checkCursoName, (req, res) => {
    const { name } = req.body;
    cursos.push(name.trim());
    return res.status(201).json({ message: 'Curso criado com sucesso!', cursos });
});

// Atualizar um curso
server.put('/cursos/:index', checkCursoExists, checkCursoName, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name.trim();
    return res.json({ message: 'Curso atualizado com sucesso!', cursos });
});

// Deletar um curso
server.delete('/cursos/:index', checkCursoExists, (req, res) => {
    const { index } = req.params;

    cursos.splice(index, 1);
    return res.json({ message: 'Curso deletado com sucesso!', cursos });
});

//informa no promp a porta que esta sendo utilizada no serviço
const PORT = 3000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
