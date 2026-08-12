const baseUrl = "https://spotify.f8team.dev";
export const httpRequest = {
    get:async (path) => {
        try {
            const res = await fetch(`${baseUrl}${path}`);
            return await res.json();
        } catch(err){
            console.error(err);
            
        }
    },
    post:async (path,data) => {
        try {
            const res = await fetch(`${baseUrl}${path}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(data),
            });
            return await res.json();
        } catch (err) {
            console.error(err);
            
        }
    }
}