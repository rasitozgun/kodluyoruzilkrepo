import axios from "axios";


async function getData(number)  {
    const user = await axios.get(`https://jsonplaceholder.typicode.com/users/${number}`).catch((err) => {
        console.log(err);
    });
    console.log(user.data);
    const userPost = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${number}`).catch((err) => {
        console.log(err);
    });
    console.log(userPost.data);
}


export default getData;