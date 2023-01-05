let form=document.querySelector('.my-form');
form.addEventListener('submit',submitForm);
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/e606adbdf9aa4239b892c2ca0af76017/userDetails')
    .then(response=>{
        for(let i=0;i<response.data.length;i++){
            showOutput(response.data[i]);
        }
    })
    .catch(err=>{console.log(err)});
});

//submit form
function submitForm(e){
    e.preventDefault();
    let name=document.querySelector('#name');
    let email=document.querySelector('#email');
    let val1=name.value;
    let val2=email.value;
    let objInfo={
        name:val1,
        email:val2,
    }
    axios.post('https://crudcrud.com/api/e606adbdf9aa4239b892c2ca0af76017/userDetails',objInfo)
    .then(response=>showOutput(response.data))
    .catch(err=>{console.log(err)});
    name.value='';
    email.value='';
}

//Delete button in list
function delFun(id){
    axios.delete(`https://crudcrud.com/api/e606adbdf9aa4239b892c2ca0af76017/userDetails/${id}`)
    .then(res=>removeFromScreen(id))
    .catch(err=>console.log(err));
}

//Edit button in List
function editFun(id,val1,val2){
    document.getElementById('name').value=val1;
    document.getElementById('email').value=val2;
    delFun(id);
}

//show  Output in the window
function showOutput(data){
    let parentNode=document.getElementById('lists');
    let childNode=`<li id=${data._id}> ${data.name} - ${data.email} <button onclick=delFun('${data._id}')>Delete</button> <button onclick=editFun('${data._id}','${data.name}','${data.email}')>Edit</button></li>`;
    parentNode.innerHTML=parentNode.innerHTML+childNode;
}

//remove user from screen
function removeFromScreen(id){
    const parentNode=document.querySelector('#lists');
    const childNode=document.getElementById(id);
    if(childNode){
        parentNode.removeChild(childNode);
    }
}
