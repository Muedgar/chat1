document.getElementById("getUserName").addEventListener('submit',async e=> {
    e.preventDefault();
    let username = document.getElementById("username").value;

    await fetch(`/getChat/${username}`).then(async d=>{
       window.location = '/getChat';
    }).catch(e=>new Error(e));
});