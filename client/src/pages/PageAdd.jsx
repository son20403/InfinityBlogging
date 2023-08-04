import React, { useState } from 'react';
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
import FormAddPost from '../components/post-item/FormAddPost';
import FormAddCategory from '../components/post-item/FormAddCategory';

const PageAdd = () => {
    return (
        <div>
            <section className='page-container min-h-screen'>
                <TabsFill></TabsFill>
            </section>
        </div>
    );
};

export default PageAdd;


function TabsFill() {
    const [fillActive, setFillActive] = useState("tab1");
    const handleFillClick = (value) => {
        if (value === fillActive) {
            return;
        }
        setFillActive(value);
    };

    return (
        <div className="mb-3">
            <TETabs fill>
                <TETabsItem
                    onClick={() => handleFillClick("tab1")}
                    active={fillActive === "tab1"}
                >
                    Thêm bài viết
                </TETabsItem>
                <TETabsItem
                    onClick={() => handleFillClick("tab2")}
                    active={fillActive === "tab2"}
                >
                    Thêm danh mục
                </TETabsItem>
            </TETabs>

            <TETabsContent>
                <TETabsPane show={fillActive === "tab1"}>
                    <FormAddPost></FormAddPost>
                </TETabsPane>
                <TETabsPane show={fillActive === "tab2"}>
                    <FormAddCategory></FormAddCategory>
                </TETabsPane>
            </TETabsContent>
        </div>
    );
}