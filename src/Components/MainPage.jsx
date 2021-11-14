import React from "react";
import {Typography, Form, Input, Button, DatePicker} from "antd";
import moment from "moment";
import {SubscriptionData} from "./SubscriptionData";

function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

function disabledDate(current) {
    // return current < moment().startOf('day');
    if (moment().hour() === 23 && moment().minute() >= 30) {
        return current < moment().endOf('day');
    } else {
        return current < moment().startOf('day');
    }
}

function disabledDateTime(inputMoment) {
    if (inputMoment) {
        let currentMoment = moment();

        if (inputMoment.date() === currentMoment.date()) {
            if (inputMoment.hour() === currentMoment.hour()) {
                if (moment().minute() >= 30) {
                    return {
                        disabledHours: () => range(0, moment().hour() + 1),
                        disabledMinutes: () => range(0, 60)
                    }
                } else {
                    return {
                        disabledHours: () => range(0, moment().hour()),
                        disabledMinutes: () => range(0, 29)
                    }
                }
            } else {
                if (moment().minute() >= 30) {
                    return {
                        disabledHours: () => range(0, moment().hour() + 1),
                        disabledMinutes: () => []
                    }
                } else {
                    return {
                        disabledHours: () => range(0, moment().hour()),
                        disabledMinutes: () => []
                    }
                }
            }
        } else {
            return {
                disabledHours: () => [],
                disabledMinutes: () => []
            }
        }
    }
}

function currentTime() {
    // По-хорошему, здесь тоже нужно проверять, является ли рассматриваемый день текущим, чтобы прописанное время
    // применялось только к текущему дню, а для всех остальных выставлялось "00:00", как ближайшее подходящее
    // к текущему в рассматриваемом дне. Но я задолбался.
    let currentMoment = moment();
    if (currentMoment.hour() === 23 && moment().minute() >= 30) {
        let futureDay = moment().add(1, 'day')
        return moment( futureDay.year() + "-" + futureDay.add(1, 'm').month() + "-" + futureDay.date() + " 00:00", "YYYY-MM-DD HH:mm")
        // return moment([futureDay.year(), futureDay.month(), futureDay.day(), '00', '00'], "YYYY-MM-DD HH:mm");
    } else {
        if (moment().minute() >= 30) {
            let nextHour = moment().add(1, 'hour');
            return moment( nextHour.year() + "-" + nextHour.add(1, 'm').month() + "-" + nextHour.date() +  " " + nextHour.hour() + ":00", "YYYY-MM-DD HH:mm")
            // return moment([nextHour.year(), nextHour.month(), nextHour.day(), nextHour.hour(), '00'], "YYYY-MM-DD HH:mm");
        } else {
            return moment( currentMoment.year() + "-" + currentMoment.add(1, 'm').month() + "-" + currentMoment.date() +  " " + currentMoment.hour() + ":30", "YYYY-MM-DD HH:mm")
            // return moment([currentMoment.year(), currentMoment.month(), currentMoment.day(), currentMoment.hour(), '30'], "YYYY-MM-DD HH:mm")
        }
    }
}

export class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {tempDate: '', clicked: false, date: ''};
    }

    handleClick() {
        this.setState({clicked: true})
        this.setState({'date': this.state.tempDate})
    }

    handleDateChange(date, dateString) {
        this.setState({'tempDate': dateString})
    }

    render() {

        let date = this.state.date;
        let isClicked = this.state.clicked;
        console.log(currentTime());

        return (
            <div>
                <Typography.Title>
                    Запись на стирку
                </Typography.Title>
                <Typography.Paragraph>
                    Вот бы ты ещё и помылся.
                </Typography.Paragraph>

                <Form
                    name="basic"
                    labelCol={{
                        span: 2,
                    }}
                    wrapperCol={{
                        span: 4,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off">
                    <Form.Item
                        label="Ваше имя"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите ваше имя!',
                            },
                        ]}>
                        <Input/>
                    </Form.Item>


                    <Form.Item
                        label="Выберите время: "
                        name="dateNTime"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, выберите время для записи!',
                            },
                        ]}>
                        <DatePicker
                            format="YYYY-MM-DD HH:mm"
                            disabledDate={disabledDate}
                            disabledTime={disabledDateTime}
                            minuteStep={30}
                            onChange={this.handleDateChange}
                            showTime={{defaultValue: currentTime()}}
                            showNow={false}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 2}}>
                        <Button type="primary" htmlType="submit" onClick={this.handleClick}>
                            Записаться
                        </Button>
                    </Form.Item>
                </Form>

                <SubscriptionData
                    date={date}
                    isClicked={isClicked}/>

            </div>
        );
    }
}
