import styled from 'styled-components'

export const TopHeaderWrapper = styled.div`
    .site-layout-background{
        display: flex;
        justify-content:space-between;

        .trigger {
            padding: 0 24px;
            font-size: 18px;
            line-height: 64px;
            cursor: pointer;
            transition: color 0.3s;
        }
        .trigger:hover {
            color: #1890ff;
        }
        .right-users{
            padding-right: 20px;
            display: flex;
            align-items: center;
        }
    }

`