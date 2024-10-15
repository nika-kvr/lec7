// 1) შექმენით ინფუთი რომლის სერჩის დროს რექუესთს გააგზავნით შემდეგ 
// აიპიაიზე: https://api.escuelajs.co/api/v1/products?title=wooden 
// როგორც ხედავთ თაითლი არის ქუერი პარამეტრი, დებაუნს ტექნიკით 
// გააკეთეთ ინფუთი რომლის ჩაწერაზეც, დარექუსთდება სწორედ title პარამეტრით.

const btn = document.querySelector('.input')
const container = document.querySelector('.container')

btn.addEventListener('input', searchDebauncer(300, async(e)=>{
  const res = await fetch(`https://api.escuelajs.co/api/v1/products?title=${e.target.value}`);
  const data = await res.json()
  displayData(data)
  
}))

function searchDebauncer(ms,callback){
  let interval;
  return (...args)=>{
    clearTimeout(interval)
    interval = setTimeout(()=>{
      callback(...args)
    }, ms)
  }
}

function displayData(data){
  container.innerHTML = data.map(el=>(
    `
      <div> 
      <h3> ${el.title} </h3>
      </div>
    `
  )).join('')
}

// 2) წამოიღეთ ინფორმაცია შემდეგი ეიპიაიდან: https://jsonplaceholder.typicode.com/users ,
//  მოსული დატა გაპარსეთ შემდეგნაირად, თითოეულ ობიექტს
//  უნდა ჰქონდეს მხოლოდ 4 ფროფერთი აიდი, სახელი, იუზერნეიმი და იმეილი

async function getData(){
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json()
  const users = data.map(user => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email
  }))
}
getData()


// 3) გაქვთ ორი აიპიაი https://fakestoreapi.com/users  და https://jsonplaceholder.typicode.com/users 
// თქვენი მიზანია ორივე ერთდოულად დაარიზოლვოთ და
//  ისე გამოიტანოთ დომში შესაბამისი ინფორამცია იუზერებზე,
//  ანუ სანამ ორივე აიპიაი პასუხს არ დააბრუნებს მანამდე არაფერი გამოაჩინოთ დომში.

const res1Container = document.querySelector('.req1List')
const res2Container = document.querySelector('.req2List')
const req1 = fetch('https://fakestoreapi.com/users');
const req2 = fetch('https://jsonplaceholder.typicode.com/users');


Promise.all([req1,req2])
  .then(async([res1,res2])=>{
    const data1 = await res1.json();
    const data2 = await res2.json();
    displayRes1Data(data1,res1Container)
    displayRes2Data(data2,res2Container)
  })


function displayRes1Data(data, container){
  container.innerHTML = data.map(el=>(
    `
      <li> 
      <h3>name: ${el.name.firstname} / email: ${el.email} </h3>
      </li>
    `
  )).join('')
}

function displayRes2Data(data, container){
  container.innerHTML = data.map(el=>(
    `
      <li> 
      <h3>name: ${el.name} / email: ${el.email} </h3>
      </li>
    `
  )).join('')
}

// 4) დაწერეთ ფუნცქია რომელიც დაგვილოგავს მაუსის კორდინატებს
//  მას შემდეგ რაც გავაჩერებთ მაუსს, გამოიყენეთ დიბაუნს ტექნიკა

document.addEventListener('mousemove', mouseDebauncer(300, function(event){
  const x = event.clientX;
  const y = event.clientY;

  console.log(`Mouse: X: ${x} / Y: ${y}`);
}));

function mouseDebauncer(ms, callback){
  let interval;
  return (...args)=>{
    clearTimeout(interval)
    interval = setTimeout(()=>{
      callback(...args)
    },ms)
  }
}