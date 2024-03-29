import React, {useState, useEffect} from "react";
import {Typography} from "antd";
import {Octokit} from "@octokit/core";

const octokit = new Octokit({auth: `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`});


function useGithubData(username) {
    const [data, setData] = useState({
        login: "Загрузка...",
        name: "Загрузка...",
        avatar_url: "Загрузка...",
        email: "Загрузка..."
    });

    useEffect(() => {
        octokit.request('GET /users/{username}', {
            username: username
        }).then(function (result) {
            const my_data = result.data
            setData(my_data)
        })

    }, [username]);

    return data;
}


export function AboutPage() {
    const githubProfileData = useGithubData('Overcastan');
    return (
        <div>
            <Typography.Title>
                Обо мне
            </Typography.Title>
            <Typography.Paragraph>
                Ник на Github: {githubProfileData.login}
            </Typography.Paragraph>
            <Typography.Paragraph>
                Имя: {githubProfileData.name}
            </Typography.Paragraph>
            <Typography.Paragraph>
                Почта для связи: {githubProfileData.email}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <img src={githubProfileData.avatar_url}
                     alt="Avatar"/>
            </Typography.Paragraph>
            <Typography.Paragraph style={{marginTop: "48px"}}>
                *Информация загружена из моего github профиля
            </Typography.Paragraph>
        </div>
    );
}
