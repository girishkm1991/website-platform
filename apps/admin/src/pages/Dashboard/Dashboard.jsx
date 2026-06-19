import { useEffect, useState } from "react";

import { getDashboard } from "../../services/dashboard.service";

export default function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboard();

            setDashboard(response);

        } catch (err) {

            console.error(err);

            setError("Failed to load dashboard.");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div
                style={{
                    padding: "40px",
                    fontFamily: "Arial"
                }}
            >

                <h2>Loading dashboard...</h2>

            </div>

        );

    }

    if (error) {

        return (

            <div
                style={{
                    padding: "40px",
                    fontFamily: "Arial",
                    color: "red"
                }}
            >

                <h2>{error}</h2>

            </div>

        );

    }

    return (

        <div
            style={{
                padding: "40px",
                fontFamily: "Arial",
                background: "#f5f7fa",
                minHeight: "100vh"
            }}
        >

            <h1>
                Welcome {dashboard.user.email} 👋
            </h1>

            <hr />

            <h2>Statistics</h2>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "40px"
                }}
            >

                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "200px",
                        boxShadow: "0 2px 10px rgba(0,0,0,.1)"
                    }}
                >

                    <h3>Total Websites</h3>

                    <h1>{dashboard.stats.total}</h1>

                </div>

                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "200px",
                        boxShadow: "0 2px 10px rgba(0,0,0,.1)"
                    }}
                >

                    <h3>Draft</h3>

                    <h1>{dashboard.stats.draft}</h1>

                </div>

                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "200px",
                        boxShadow: "0 2px 10px rgba(0,0,0,.1)"
                    }}
                >

                    <h3>Published</h3>

                    <h1>{dashboard.stats.published}</h1>

                </div>

            </div>

            <hr />

            <h2>Recent Websites</h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "#fff"
                }}
            >

                <thead>

                    <tr>

                        <th
                            style={{
                                textAlign: "left",
                                padding: "12px"
                            }}
                        >
                            Title
                        </th>

                        <th
                            style={{
                                textAlign: "left",
                                padding: "12px"
                            }}
                        >
                            Slug
                        </th>

                        <th
                            style={{
                                textAlign: "left",
                                padding: "12px"
                            }}
                        >
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        dashboard.recentWebsites.map((website) => (

                            <tr
                                key={website.id}
                            >

                                <td
                                    style={{
                                        padding: "12px"
                                    }}
                                >
                                    {website.title}
                                </td>

                                <td
                                    style={{
                                        padding: "12px"
                                    }}
                                >
                                    {website.slug}
                                </td>

                                <td
                                    style={{
                                        padding: "12px"
                                    }}
                                >
                                    {website.status}
                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}
