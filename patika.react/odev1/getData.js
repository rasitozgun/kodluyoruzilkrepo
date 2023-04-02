import axios from "axios"; // Import axios


async function getData(number)  {
    // Get user data
    const user = await axios.get(`https://jsonplaceholder.typicode.com/users/${number}`).catch((err) => {
        console.log(err); // Catch errors
    });
    // Get user posts
    console.log(user.data); // Print user data

    // Get user posts
    const userPost = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${number}`).catch((err) => {
        console.log(err); // Catch errors
    });
    console.log(userPost.data); // Print user posts
}


export default getData; // Export getData function