import axios from "axios"
import GitMateError from "./customError.js"
import dotenv from "dotenv"

dotenv.config();

const GITHUB_TOKEN = process.env.GIT_API_TOKEN;

async function user(username) {
    if(!username) {
        throw new GitMateError(400, "username is required!");
    }
    try {
        const res = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {Authorization: `${GITHUB_TOKEN}`}
        });
        if(res.status === 404) {
            throw new GitMateError(400, "GitHub User Not Found!");
        } 
        return res.data;
    } catch(err) {  
        if(err instanceof GitMateError) {
            console.error(`GitMate Error (${err.status}: ${err.message})`);
        }
    }
}

async function repos(username) {
    if(!username) {
        throw new GitMateError(404, "username is required!");
    }
    try {
        const repos = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {Authorization: `${GITHUB_TOKEN}`}
        });
        if(!repos.data.length) {
            console.log("No Repository Available!");
            return [];
        } 
        return repos.data;
    } catch(err) {
        if(err instanceof GitMateError) {
            console.error(`GitMate Error (${err.status}: ${err.message})`);
        }
    }
}

const gitmate = {
    user: async (username)=>{
        const res = await user(username);
        if(!res) {
            console.log("Error 404: User Not Found");
            return "";
        }
        return res;
    },
    repos: async (username)=>{
        const res = await repos(username);
        if(!res) {
            console.log("Error 404: User Not Found");
            return "";
        }
        return res;
    },
    concisedRepos: async (username)=>{
        let res = await repos(username);
        if(!res) {
            console.log("Error 404: User Not Found");
            return "";
        }
        let conciseRes = res.map(rep => {
            let repo = {
                repo_name: rep.name,
                language: rep.language,
                star_count: rep.stargazers_count,
                watch_count: rep.watchers,
                fork_count: rep.forks,
                created_at: rep.created_at,
                updated_at: rep.updated_at,
                pushed_at: rep.pushed_at,
                repo_url: rep.html_url,
                owner: rep.owner.login
            }
            return repo;
        });
        return conciseRes;
    },
    topRepos: async (username, count)=>{
        const res = await repos(username);
        if(!res) {
            console.log("Error 404: User Not Found");
            return "";
        }
        if(res.length < count) {
            console.log(`${username} owns only ${res.length} repositories!`);
            return [];
        }
        res.sort((a,b) => b.stargazers_count - a.stargazers_count);
        let i = 0;
        const topRepo = res.map(repo => {
            const rep = {
                name: repo.name,
                stars: repo.stargazers_count,
                url: repo.html_url
            }
            return rep;
        });
        let tops = [];
        for(let i = 0; i < count; i++) {
            tops[i] = topRepo[i];
        }
        return tops;
    },
    languageUsed: async (username)=>{
        const res = await repos(username);
        if(!res) {
            console.log("Error 404: User Not Found");
            return "";
        }
        const map = new Set();
        const languages = res.map(repo => {
            if(repo.language) {
                return repo.language;
            }
        });
        for(let i = 0; i < languages.length; i++) {
            if(languages[i] !== undefined) {
                map.add(languages[i]);
            }
        }
        const distinctLanguages = Array.from(map);
        return distinctLanguages;
    }
}

export default gitmate;






