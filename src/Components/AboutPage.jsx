import React, {useState, useEffect} from "react";
import {Typography} from "antd";
import {Octokit} from "@octokit/core";

const octokit = new Octokit({auth: `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`});


function useGithubData(username) {
    const [data, setData] = useState({
        data: {
            login: "Загрузка...",
            name: "Загрузка...",
            avatar_url: "Загрузка...",
            email: "Загрузка..."
            }
        });

    useEffect(() => {
        const getData = async () => {
            const response = await octokit.request('GET /users/{username}', {
                username: username
            });

            setData(response)
        };
        getData();
    }, [username]);

    return data;
}


export function AboutPage() {
    const githubProfileData = useGithubData('Overcastan');

    console.log(githubProfileData)
    // console.log(githubProfileData.data.login)
    return (
        <div>
            <Typography.Title>
                Обо мне
            </Typography.Title>
            <Typography.Paragraph>
                Ник на Github: {githubProfileData.data.login}
            </Typography.Paragraph>
            <Typography.Paragraph>
                Имя: {githubProfileData.data.name}
            </Typography.Paragraph>
            <Typography.Paragraph>
                Почта для связи: {githubProfileData.data.email}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <img src={githubProfileData.data.avatar_url}
                     alt="Avatar"/>
            </Typography.Paragraph>
            <Typography.Paragraph style={{marginTop: "48px"}}>
                Информация взята из моего github профиля
            </Typography.Paragraph>
        </div>
    );
}
