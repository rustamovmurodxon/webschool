import { Card, Statistic as AntStatistic, Typography, Row, Col, Space, Button } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useStatistic } from "../service/query/useStatistic";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

interface StatCard {
  key: string;
  title: string;
  icon: React.ReactNode;
  gradient: string;
  link: string;
}

export const Statistic = () => {
  const { data, isLoading } = useStatistic();
  const navigate = useNavigate();
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  const statCards: StatCard[] = [
    {
      key: "adminCount",
      title: "Adminlar",
      icon: <UserOutlined style={{ fontSize: 34 }} />,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      link: "/app/admin",
    },
    {
      key: "teacherCount",
      title: "O‘qituvchilar",
      icon: <TeamOutlined style={{ fontSize: 34 }} />,
      gradient: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
      link: "/app/admin/teachers",
    },
    {
      key: "studentCount",
      title: "O‘quvchilar",
      icon: <UsergroupAddOutlined style={{ fontSize: 34 }} />,
      gradient: "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)",
      link: "/app/admin/students",
    },
    {
      key: "groupCount",
      title: "Guruhlar",
      icon: <BookOutlined style={{ fontSize: 34 }} />,
      gradient: "linear-gradient(135deg, #56ccf2 0%, #2f80ed 100%)",
      link: "/app/admin/groups",
    },
  ];

  useEffect(() => {
    if (data?.data) {
      statCards.forEach((card) => {
        const value = data.data[card.key as keyof typeof data.data] || 0;
        let current = 0;
        const increment = Math.max(1, value / 30);
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            current = value;
            clearInterval(timer);
          }
          setAnimatedValues((prev) => ({
            ...prev,
            [card.key]: Math.floor(current),
          }));
        }, 25);
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <Text>Ma'lumotlar yuklanmoqda...</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header */}
        <Card
          style={{
            background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
            borderRadius: 14,
            color: "#fff",
          }}
        >
          <Title level={2} style={{ margin: 0, color: "#fff" }}>
            Xush kelibsiz 👋
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 16 }}>
            EduManage boshqaruv paneli — umumiy statistika
          </Text>
        </Card>

        {/* Statistics cards */}
        <Row gutter={[20, 20]}>
          {statCards.map((card) => (
            <Col xs={24} sm={12} lg={6} key={card.key}>
              <Card
                hoverable
                onClick={() => navigate(card.link)}
                style={{
                  borderRadius: 16,
                  background: card.gradient,
                  color: "#fff",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                }}
                bodyStyle={{ padding: 24 }}
              >
                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {card.icon}
                    </div>
                    <ArrowRightOutlined style={{ fontSize: 22, opacity: 0.8 }} />
                  </div>

                  <AntStatistic
                    title={<Text style={{ color: "rgba(255,255,255,0.85)" }}>{card.title}</Text>}
                    value={animatedValues[card.key] ?? 0}
                    valueStyle={{
                      color: "#fff",
                      fontSize: 38,
                      fontWeight: 700,
                    }}
                  />
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Quick actions */}
        <Card style={{ borderRadius: 14 }}>
          <Title level={4} style={{ marginBottom: 20 }}>
            Tezkor amallar
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Button
                block
                size="large"
                icon={<TeamOutlined />}
                onClick={() => navigate("/app/admin/teachers")}
                style={{ height: 60, borderRadius: 12 }}
              >
                O‘qituvchi qo‘shish
              </Button>
            </Col>
            <Col xs={24} md={8}>
              <Button
                block
                size="large"
                icon={<BookOutlined />}
                onClick={() => navigate("/app/admin/groups")}
                style={{ height: 60, borderRadius: 12 }}
              >
                Guruh yaratish
              </Button>
            </Col>
            <Col xs={24} md={8}>
              <Button
                block
                size="large"
                icon={<UsergroupAddOutlined />}
                onClick={() => navigate("/app/admin/students")}
                style={{ height: 60, borderRadius: 12 }}
              >
                O‘quvchi qo‘shish
              </Button>
            </Col>
          </Row>
        </Card>
      </Space>
    </div>
  );
};
