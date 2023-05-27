let argArr = [];
const id = uuid.v4();
const forResult = document.getElementById('for_result');
const addArgBtn = document.getElementById('addArg_btn');

// Update Arg Components
function updateArgFunc(e) {
  const id = e.target.parentNode.id;
  let name, value;
  if (e.target.name == 'arg_name') {
    name = e.target.value;
    value = Boolean(e.target.nextElementSibling.value);
  } else {
    name = e.target.previousElementSibling.value;
    value = Boolean(e.target.value);
  }
  argArr = argArr.map(arg => {
    if (arg.id === id) {
      arg.arg_name = name;
      arg.arg_value = value;
    }
    return arg;
  });
}

// Delete Arg Components
function deleteArgFunc(e) {
  const id = e.target.parentNode.id;
  argArr = argArr.filter(arg => arg.id !== id);
  document.getElementById(id).remove();
}

// Create Arg Components
function addArgFunc() {
  const obj = { id: uuid.v4(), arg_name: 'newArg', arg_value: true };
  argArr = [...argArr, obj];
  console.log(argArr);

  const html = `
    <div class="arg" id="${obj.id}">
      <input type="text" class="arg_name" placeholder="Name" name="arg_name" value="${obj.arg_name}" />
      <select name="arg_value" class="arg_value">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <button class="arg_delete">Delete</button>
    </div>
  `;
  document.getElementById('args').insertAdjacentHTML('afterBegin', html);
  document.querySelector('.arg_delete').addEventListener('click', (e) => {
    deleteArgFunc(e);
  });
  document.querySelector('.arg_name').addEventListener('change', (e) => {
    updateArgFunc(e);
  });
  document.querySelector('.arg_value').addEventListener('change', (e) => {
    updateArgFunc(e);
  });
}

addArgBtn.addEventListener('click', function () {
  addArgFunc();
})

function deleteArgEl(e) {
  e.target.parentNode.firstElementChild.style.display = 'block';
  e.target.previousElementSibling.remove();
  e.target.remove();
}

function consArg(e) {
  const parentNode = e.target.parentNode;

  if (e.target.value === 'select_arg') {
    e.target.style.display = 'none';

    let options = '';

    argArr.forEach(arg => {
      options += `<option value="${arg.arg_value}">${arg.arg_name}</option>`;
    });

    const argEl = `
    <select class="argEl" id="${uuid.v4()}">
    ${options}
    </select>
    <button class="deleteArgEl">Delete</button>
    `;

    parentNode.insertAdjacentHTML('beforeEnd', argEl);
    document.querySelector('.deleteArgEl').addEventListener('click', (e) => {
      deleteArgEl(e);
    });
  }
  else if (e.target.value === 'constants') {
    e.target.style.display = 'none';

    const argEl = `
    <select class="argEl" id="${uuid.v4()}">
    <option value="true">true</option>
    <option value="false">false</option>
    </select>
    <button class="deleteArgEl">Delete</button>
    `;

    parentNode.insertAdjacentHTML('beforeEnd', argEl);
    document.querySelector('.deleteArgEl').addEventListener('click', (e) => {
      deleteArgEl(e);
    });
  }
  else if (e.target.value === 'and' || e.target.value === 'or') {
    let html = ``;
    let ids = [];
    argArr.forEach(arg => {
      const id = uuid.v4();
      ids = [...ids, id]
      html = html + `
      <div class="selector_container">
      <select class="selector_el" id="${id}">
      <option value="select_op">select op...</option>
      <option value="constants">constants</option>
      <option value="select_arg">select arg...</option>
      <option value="and">and</option>
      <option value="or">or</option>
      </select>
      </div>
      `;
    });
    parentNode.insertAdjacentHTML('beforeEnd', html);
    ids.forEach(el => {
      document.getElementById(el).addEventListener('change', (e) => {
        consArg(e);
      });
    });
  }
}

function createSelector() {
  const selectorContainer = document.createElement('div');
  selectorContainer.className = 'selector_container';
  const selectorEl = `
  <select class="selector_el" id="${uuid.v4()}">
  <option value="select_op">select op...</option>
  <option value="constants">constants</option>
  <option value="select_arg">select arg...</option>
  <option value="and">and</option>
  <option value="or">or</option>
  </select>
  `;
  selectorContainer.insertAdjacentHTML('afterBegin', selectorEl);
  forResult.appendChild(selectorContainer);

  document.querySelector('.selector_el').addEventListener('change', (e) => {
    consArg(e);
  });
}
createSelector();

