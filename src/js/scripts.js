// ====== ESTADO DA APLICAÇÃO ======
const materias = [] // aqui ficam as matérias


// ====== ELEMENTOS DO DOM ======
const inputMeta = document.querySelector('#meta')
const inputMateria = document.querySelector('#materia')
const selectPrioridade = document.querySelector('#prioridade')
const btnAdd = document.querySelector('#btn-add')
const lista = document.querySelector('#materias-lista')
const resumo = document.querySelector('#resumo')


// ====== EVENTOS ======
btnAdd.addEventListener('click', adicionarMateria)


// ====== FUNÇÕES ======

function adicionarMateria() {
  // 1️⃣ Pegar valores dos inputs
  const meta = inputMeta.value.trim()
  const materia = inputMateria.value.trim()
  const prioridade = selectPrioridade.value
  // Feito

  // 2️⃣ Validar (se estiver vazio, para tudo)
  if (!meta || !materia || !prioridade) {
    alert("Ainda restam campos vazios!")
    alert("Preencha-os!")
    return
  }
  // Feito

  // 3️⃣ Criar objeto da matéria
  const novaMateria = {
  meta: meta,
  nome: materia,
  prioridade: prioridade,
  status: 'Estudando'
}
  //FEITO

  // 4️⃣ Adicionar no array materias
  materias.push(novaMateria)
  // FEITO

  // 5️⃣ Limpar inputs
  inputMeta.value = ''
  inputMateria.value = ''
  selectPrioridade.value = ''
  // feito

  // 6️⃣ Atualizar tela
  renderizarMaterias()
  atualizarResumo()
  salvarMaterias()
}


function renderizarMaterias() {
  lista.innerHTML = ''
  // Feito

  materias.forEach((m, index) => {
    const li = document.createElement('li')
    li.textContent = `${m.meta} - ${m.nome} | ${m.status}`

    const btnDeletar = document.createElement('button')
    btnDeletar.textContent = 'Deletar'
    btnDeletar.addEventListener('click', () => {
      deletarMateria(index)
    });

    const btnConcluir = document.createElement('button')
    btnConcluir.textContent = ("Concluir")
    btnConcluir.addEventListener('click', () => {
      concluirMateria(index)
    });
    li.appendChild(btnConcluir)
    li.appendChild(btnDeletar)
    lista.appendChild(li)

    if (m.status === 'Concluída') {
    btnConcluir.disabled = true
  }
  })
}


function atualizarResumo() {
  const total = materias.length

  const concluidas = materias.filter(m => m.status === 'Concluída').length

  resumo.textContent = `Total: ${total} | Concluídas: ${concluidas}`
}

function concluirMateria(index) {
  materias[index].status = 'Concluída'
  renderizarMaterias()
  atualizarResumo()
  salvarMaterias()
}

function deletarMateria(index) {
  materias.splice(index, 1)
  renderizarMaterias()
  atualizarResumo()
  salvarMaterias()
}

function salvarMaterias() {
  localStorage.setItem('materias', JSON.stringify(materias))
}

function carregarMaterias() {
  const dados = localStorage.getItem('materias')

  if (dados) {
    materias.push(...JSON.parse(dados))
  }

  renderizarMaterias()
  atualizarResumo()
}
  carregarMaterias()
