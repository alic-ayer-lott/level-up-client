export const getProfile = () => {
    // TODO: Add the fetch call to the profile resource
    return fetch("http://localhost:8000/profile", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}
    
