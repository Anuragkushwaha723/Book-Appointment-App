let form = document.querySelector('.my-form');
form.addEventListener('submit', submitForm);
window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/user/get-user-data')
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                showOutput(response.data[i]);
            }
        })
        .catch(err => { console.log(err) });
});

//submit form
function submitForm(e) {
    e.preventDefault();
    let name = document.querySelector('#name');
    let phone = document.querySelector('#phone');
    let email = document.querySelector('#email');
    let val1 = name.value;
    let val2 = email.value;
    let val3 = phone.value;
    let objInfo = {
        name: val1,
        email: val2,
        phone: val3
    }
    axios.post('http://localhost:3000/user/add-user-data', objInfo)
        .then(response => {
            showOutput(response.data);
        })
        .catch(err => {
            console.log(err)
        });
    name.value = '';
    email.value = '';
    phone.value = '';
}

//Delete button in list
function delFun(id) {
    axios.delete(`http://localhost:3000/user/delete-user-data/${id}`)
        .then((res) => {
            console.log(res.data.id);
            removeFromScreen(res.data.id);
        })
        .catch(err => console.log(err));

}

//Edit button in List
function editFun(id, val1, val2, val3) {
    document.getElementById('name').value = val1;
    document.getElementById('email').value = val3;
    document.getElementById('phone').value = val2;
    delFun(id);
}

//show  Output in the window
function showOutput(data) {
    let parentNode = document.getElementById('lists');
    let childNode = `<li id=${data.id}> ${data.name} -  ${data.phone} - ${data.email} <button onclick=delFun('${data.id}')>Delete</button> <button onclick=editFun('${data.id}','${data.name}','${data.phone}','${data.email}')>Edit</button></li>`;
    parentNode.innerHTML = parentNode.innerHTML + childNode;
}

//remove user from screen
function removeFromScreen(id) {
    const parentNode = document.querySelector('#lists');
    console.log(parentNode);
    const childNode = document.getElementById(id);
    console.log(childNode);
    if (childNode) {
        parentNode.removeChild(childNode);
    }
}
