import React from "react";
import {Typography} from "antd";

export class AboutPage extends React.Component {
    render() {
        return (
            <div>
                <Typography.Title>
                    Обо мне
                </Typography.Title>
                <Typography.Paragraph>
                    Задание подготовил студент 5 курса Хмуро Андрей.
                </Typography.Paragraph>
            </div>
        );
    }
}
