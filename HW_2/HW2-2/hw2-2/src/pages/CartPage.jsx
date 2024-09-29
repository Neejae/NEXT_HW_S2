import React from "react";
import styled from "@emotion/styled";
import { GNB } from "components/GNB";
import { GNB_TYPE } from "constants/common";
import { ProductInCart } from "components/ProductInCart";
import { Box } from "styles/StyleComponent";
import { useCartStore } from "store/CartStore";

function CartPage() {
    const { cart, setCart } = useCartStore();

    console.log(cart);

    return (
        <Base>
            <GNB type={GNB_TYPE.MAIN} />
            <Inner>
                <Box gap={30}>
                    {cart.map((product, id) => (
                        <ProductInCart
                            key={id}
                            product={product}
                            cart={cart}
                            setCart={setCart}
                        />
                    ))}
                </Box>
            </Inner>
        </Base>
    );
}

export default CartPage;

const Base = styled.div`
    width: 100%;
`;
const Inner = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 72px 20px 69px;
`;
