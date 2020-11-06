// The key feature is when state changes UI gets updated. Also , when UI gets updated state changes.
const createState = (state) => {

    return new Proxy(state,{
        set(target,prop,val){
            target[prop] = val;
            render();
        }
    });
}

const state = createState({
    firstName : "Sushant",
    lastName : "Mahajan"
});

const render = () =>{
    document.querySelector('[data-model = "firstName"]').value = state.firstName;
    document.querySelector('[data-model = "lastName"]').value = state.lastName;
    document.querySelector('[data-binding = "firstName"]').innerHTML = state.firstName;
    document.querySelector('[data-binding = "lastName"]').innerHTML = state.lastName;
    }

render();


const listener = (event) => {
    state[event.target.dataset.model] = event.target.value;
  };
document.querySelector('[data-model="firstName"]').addEventListener('keyup', listener);  
document.querySelector('[data-model="lastName"]').addEventListener('keyup', listener);


