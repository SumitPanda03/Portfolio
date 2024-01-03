import { ReactTerminal } from "react-terminal";
import "./terminal.css";
import { useState, useRef, useEffect } from "react";
function TerminalController(props) {
    const [currentLocation, setCurrentLocation] = useState("#About");
    const [user, setUser] = useState("");
    const email = "sbpanda1308@gmail.com";
    const [promptText, setPromptText] = useState("$ Sumit >>");
    const terminalRef = useRef(null);
    useEffect(() => {
        const handleTerminalFocus = (event) => {
          event.preventDefault();
      
          if (terminalRef.current) {
            terminalRef.current.focusInput();
          }
        };
      
        const terminalContainer = terminalRef.current?.containerElement;
      
        if (terminalContainer) {
          // Add the focus event listener
          terminalContainer.addEventListener('focus', handleTerminalFocus);
      
          // Add touchstart event listener to prevent automatic scrolling on touch
          terminalContainer.addEventListener('touchstart', (event) => {
            event.preventDefault();
          });
        }
      
        // Clean up the event listeners on component unmount
        return () => {
          if (terminalContainer) {
            terminalContainer.removeEventListener('focus', handleTerminalFocus);
            terminalContainer.removeEventListener('touchstart', (event) => {
              event.preventDefault();
            });
          }
        };
      }, [terminalRef]);
    const updateCurrentLocation = () => {
        const path = window.location.hash.slice(1); // Remove the leading "/"
        setCurrentLocation(path || "#");
    };

    const scrollToElement = (element) => {
        window.scroll({
            behavior: "smooth",
            left: 0,
            top: element.offsetTop,
        });
    };
    const echo = (input) => {
        console.log(input);
        return (
            <div style={{ fontFamily: "monospace", color: "#80FF80" }}>
                {input}
            </div>
        );
    };

    const handleInput = (input, print) => {
        //   console.log(input);
        // print(echo(input));
    };
    const navigateTo = (path) => {
        const targetElement = document.querySelector(path);
        if (targetElement) {
            window.location.hash = path;
            scrollToElement(targetElement);
            updateCurrentLocation();
        }
    };

    const handleCommand = (command, print) => {
        // Custom default handler for unknown commands
        print(
            `"${command}" is not a recognized command. Type 'help' for available commands.`
        );
    };

    const start = (input, print) => {
        console.log(input);
        setUser(input);
        setPromptText(`$ ${input} >>`);
        return <div>Your Name : {input}</div>;
    };
    // Define commands here
    const commandList = [
        { cmd: "help", desc: "check available commands" },
        { cmd: "start", desc: "Type Start with your Name" },
        { cmd: "welcome", desc: "GoTo start of Portfolio" },
        { cmd: "about", desc: "Know Me" },
        { cmd: "skills", desc: "My Skills" },
        { cmd: "experience", desc: "My Experiences" },
        { cmd: "projects", desc: "My Projects" },
        { cmd: "education", desc: "mMy Education Background" },
        { cmd: "email", desc: "Send Email to me at :" },
        { cmd: "socials", desc: "My Socials" },
        { cmd: "echo", desc: "Type anything after 'echo' to print" },
        { cmd: "whoami", desc: "Who Are You??" },
        { cmd: "clear", desc: "clear the terminal" },
    ];

    const CommandList = ({ commandList }) => (
        <>
            {commandList.map(({ cmd, desc }) => (
                <div
                    key={cmd}
                    style={{ marginBottom: "8px", fontFamily: "monospace" }}
                >
                    <strong style={{ color: "#80FF80" }}>{cmd}</strong>:{" "}
                    <span style={{ fontWeight: "lighter" }}>{desc}</span>
                </div>
            ))}
        </>
    );
    const commands = {
        help: () => <CommandList commandList={commandList} />,
        start: start,
        welcome: "Welcome",
        about: () => {
            navigateTo("#about");
            return "Navigating to About section...";
        },
        skills: () => {
            navigateTo("#skills");
            return "Navigating to Skill section...";
        },
        experience: () => {
            navigateTo("#experience");
            return "Navigating to Experience section...";
        },
        projects: () => {
            navigateTo("#projects");
            return "Navigating to Projects section...";
        },
        education: () => {
            navigateTo("#education");
            return "Navigating to Education section...";
        },
        email: (
            <>
                Send Email to me at:
                <br />
                <a href={`mailto:${email}`}>{email}</a>
            </>
        ),
        socials: (
            <>
                Connect with me on social media:
                <br />
                <a
                    href="https://x.com/Sumit_Panda_?t=YUiDFeiDA9M26WCj4iTMHA&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Twitter
                </a>
                <br />
                <a
                    href="https://www.linkedin.com/in/sumit-panda-50ba2b224/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LinkedIn
                </a>
                <br />
                <a
                    href="https://github.com/SumitPanda03"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
                <br />
                <a
                    href="https://www.instagram.com/sumit_panda?igsh=OGQ5ZDc2ODk2ZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Instagram
                </a>
            </>
        ),
        echo: echo,
        whoami: (print) => {
            console.log(user);
            if (user) {
                return <div>{user}</div>;
            } else {
                return "IDK, Type Start";
            }
        },

        clear: "Cleared",
    };

    return (
        <>
            <div className="container">
                <div className="terminal">
                    <ReactTerminal
                        ref={terminalRef}
                        commands={commands}
                        themes={{
                            "my-custom-theme": {
                                themeBGColor: "#272B36",
                                themeToolbarColor: "#272B36",
                                themeColor: "#FFFEFC",
                                themePromptColor: "rgba(22, 114, 235, 0.555)",
                            },
                        }}
                        theme="my-custom-theme"
                        welcomeMessage={
                            <p
                                style={{
                                    color: "rgba(134, 86, 130, 0.877)",
                                    fontSize: "18px",
                                    margin: "0",
                                }}
                            >
                                Welcome to my website! Get started by typing
                                'help' command below
                            </p>
                        }
                        showControlBar
                        prompt={promptText}
                        errorMessage="Command not found. Type 'help' for available commands."
                        enableInput
                        showControlButtons
                        // defaultHandler={handleCommand}
                        onInput={handleInput}
                    />
                </div>
            </div>
        </>
    );
}

export default TerminalController;
