import axios from "axios";
import { Component } from "react";
const baseURL = "https://task6server-0gi3.onrender.com";
export class Posts extends Component {
    static getIds = () => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${baseURL}/api/getIds`)
                .then((response) => {
                    console.log(response.data);
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };
    static createRoom = () => {
        return new Promise((resolve, reject) => {
            axios
                .post(`${baseURL}/api/createRoom`)
                .then((response) => {
                    console.log(response.data);
                    resolve(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

}