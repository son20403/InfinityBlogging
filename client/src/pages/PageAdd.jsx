import React, { useState } from 'react';

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

import FormAddPost from '../components/post-item/FormAddPost';
import FormAddCategory from '../components/post-item/FormAddCategory';

const PageAdd = () => {
    return (
        <div>
            <section className='page-container min-h-screen'>
                <TabsDefault></TabsDefault>
            </section>
        </div>
    );
};

export default PageAdd;

function TabsDefault() {
    const data = [
        {
            label: "Thêm bài viết",
            value: "addPost",
            component: <FormAddPost></FormAddPost>,
        },
        {
            label: "Thêm danh mục",
            value: "addCategory",
            component: <FormAddCategory></FormAddCategory>,
        },
    ];

    return (
        <Tabs value="addPost">
            <TabsHeader>
                {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, component }) => (
                    <TabPanel key={value} value={value}>
                        {component}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}