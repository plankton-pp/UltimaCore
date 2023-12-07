import { Outlet} from 'react-router-dom'
import React from 'react';

const AppLayout: React.FC = () => {
    // const navigate = useNavigate();

    // const handleNavigate = (item: any) => {
    //     // const filteredActiveMenu = helper.findMenuByKeyValue(appMenu, "key", item['key']);
    //     // setBreadCrumb(filteredActiveMenu);
    //     console.log(item);

    //     navigate(`/${item}`);
    // };
    const buttonConfig = [
        {
            name: "Dashboard",
            key: "dashboard"
        },
        {
            name: "ToDo",
            key: "todo"
        },
    ];

    return (
        <>

            <ul>
                {
                    buttonConfig.map(btn => {
                        return (
                            <li key={'li-' + btn.key}>
                                <a href={'#/' + btn.key} className="font-display max-w-sm text-2xl font-bold leading-tight">
                                    <span className="link link-underline link-underline-black">  {btn.name} </span>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    );
};

export default AppLayout;