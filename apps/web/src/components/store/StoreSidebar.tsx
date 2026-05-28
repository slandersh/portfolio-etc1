"use client";

import type { FC } from "react";
import { Column, Flex, Text } from "@once-ui-system/core";
import classNames from "classnames";
import styles from "./StoreSidebar.module.scss";

/**
 * Props untuk komponen StoreSidebar.
 */
interface StoreSidebarProps {
    /** Daftar nama kategori produk yang tersedia */
    categories: string[];
    /** Kategori yang sedang aktif/dipilih */
    activeCategory: string;
    /** Callback yang dipanggil saat pengguna memilih kategori lain */
    onCategoryChange: (category: string) => void;
    /** Kode mata uang aktif saat ini ("USD" atau "IDR") */
    currency: string;
    /** Callback yang dipanggil saat pengguna mengklik tombol ganti mata uang */
    onCurrencyToggle: () => void;
}

const StoreSidebar: FC<StoreSidebarProps> = ({ 
    categories, 
    activeCategory, 
    onCategoryChange,
    currency,
    onCurrencyToggle
}) => {
    return (
        <Column
            className={styles.sidebar}
            left="0"
            style={{
                top: "50%",
                transform: "translateY(-50%)",
                whiteSpace: "nowrap",
            }}
            position="fixed"
            paddingLeft="24"
            gap="32"
            s={{ hide: true }}
        >
            {categories.map((category) => (
                <Flex
                    key={category}
                    className={classNames(styles.hover, {
                        [styles.active]: activeCategory === category,
                    })}
                    gap="8"
                    vertical="center"
                    onClick={() => onCategoryChange(category)}
                >
                    <Flex 
                        height="1" 
                        minWidth="16" 
                        background="neutral-strong" 
                        className={styles.line} 
                    />
                    <Text 
                        variant="label-default-s"
                        onBackground={activeCategory === category ? "brand-medium" : "neutral-weak"}
                    >
                        {category}
                    </Text>
                </Flex>
            ))}
            <Flex 
                height="1" 
                fillWidth 
                background="neutral-alpha-weak" 
                marginTop="16" 
                marginBottom="8"
            />

            <Flex
                className={classNames(styles.hover)}
                gap="8"
                vertical="center"
                onClick={onCurrencyToggle}
                style={{ cursor: "pointer" }}
            >
                <Flex 
                    height="1" 
                    minWidth="16" 
                    background="brand-medium" 
                    className={styles.line} 
                />
                <Flex gap="4">
                    <Text 
                        variant="label-default-s"
                        onBackground={currency === "USD" ? "brand-medium" : "neutral-weak"}
                    >
                        USD
                    </Text>
                    <Text variant="label-default-s" onBackground="neutral-weak">/</Text>
                    <Text 
                        variant="label-default-s"
                        onBackground={currency === "IDR" ? "brand-medium" : "neutral-weak"}
                    >
                        IDR
                    </Text>
                </Flex>
            </Flex>
        </Column>
    );
};

export default StoreSidebar;
