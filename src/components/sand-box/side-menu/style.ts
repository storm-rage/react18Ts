import styled from 'styled-components'

export const SildeMenuWrapper = styled.div`
    height: 100%;
    .all-menus{
        display: flex;
        flex-direction:column;
        .logo{
            line-height: 32px;
            color:white;
            border-bottom: 1px solid rgba(255,255,255,.1);
            font-size: 18px;
            padding: 10px;
            text-align: center;
        }
        .menus{
            flex:1;
            overflow: hidden;
        }
        }
    
`