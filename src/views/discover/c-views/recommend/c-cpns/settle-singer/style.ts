import { styled } from "styled-components";

export const SingerWrapper = styled.div`
  padding: 20px;

  .singers {
    .item {
      display: flex;
      height: 62px;
      margin-top: 14px;
      background-color: #fafafa;
      text-decoration: none;

      :hover {
        background-color: #f4f4f4;
      }

      img {
        width: 62px;
        height: 62px;
      }

      .info {
        height: 100%;
        width: 100%;
        padding: 8px 0 0 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .name {
          color: #333;
          font-size: 14px;
          font-weight: 700;
        }

        .alia {
          margin-top: 5px;
        }
      }
    }
  }
`
