import React from "react";
import styled from "styled-components";
import colors from "./color";

const ChatCloud: React.FC<{
  direction: "sent" | "received" | "info";
  showTail?: boolean;
  children: React.ReactNode;
}> = ({ children, direction, showTail }) => {
  const isSent = direction === "sent";

  return (
    <CloudWrapper sent={isSent}>
      {isSent ? (
        <SentBubble showTail={showTail}>{children}</SentBubble>
      ) : (
        <ReceivedBubble showTail={showTail}>{children}</ReceivedBubble>
      )}
    </CloudWrapper>
  );
};

export default ChatCloud;

// styled

interface wrapperProps {
  sent: boolean;
}

const CloudWrapper = styled.div<wrapperProps>`
  width: 100%;
  padding: 0.2rem 0.4rem;
  display: flex;
  justify-content: ${(props) => (props.sent ? "end" : "start")};
`;

interface baseBubbleProps {
  showTail?: boolean;
  children?: React.ReactNode;
}

const BaseBubble = styled.div<baseBubbleProps>`
  padding: 0.3rem 1rem;
  color: #ffffff;
  font-weight: 200;
  border-radius: 3px;
  position: relative;
  max-width: 80%;
`;

const SentBubble = styled(BaseBubble)`
  background-color: ${colors.greenTealDark};
  box-shadow: 1px 1px 2px ${colors.greenTeal};
  &::after {
    content: "";
    position: absolute;
    display: ${(props) => (props.showTail ? "block" : "none")};
    z-index: 0;
    height: 9px;
    width: 14px;
    background-color: ${colors.greenTealDark};
    right: 0px;
    bottom: -5px;
    transform: skew(20deg) rotate(20deg);
  }
`;

const ReceivedBubble = styled(BaseBubble)`
  background-color: ${colors.gray};
  box-shadow: -1px 1px 2px #373737;
  &::after {
    content: "";
    display: ${(props) => (props.showTail ? "block" : "none")};
    position: absolute;
    z-index: 0;
    height: 9px;
    width: 14px;
    background-color: ${colors.gray};
    /* background-color: red; */
    left: -2px;
    bottom: -5px;
    transform: skew(-20deg) rotate(-20deg);
  }
`;