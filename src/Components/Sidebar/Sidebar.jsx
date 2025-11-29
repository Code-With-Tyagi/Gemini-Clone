import { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt,newChat } = useContext(Context);

    const loadPrompts = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <div className="sidebar">
            <div className="top">
                <img
                    className="menu"
                    src={assets.menu_icon}
                    alt=""
                    onClick={() => setOpen(!open)}
                />

                <div className="new-chat">
                    <img  onClick={newChat} src={assets.plus_icon} alt="" />
                    {open && <p>New Chat</p>}
                </div>

                {open && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>

                        {prevPrompts.map((item, index) => (
                            <div
                                className="recent-entry"
                                key={index}
                                onClick={() => loadPrompts(item)}
                            >
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {open && <p>Help</p>}
                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {open && <p>Activity</p>}
                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {open && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
