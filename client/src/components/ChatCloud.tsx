import React from "react";
import styled from "styled-components";
import colors from "./color";

const ChatCloud: React.FC<{
  direction: "sent" | "received" | "info";
  showTail?: boolean;
  showName?: boolean;
  name?: string | null;
  children: React.ReactNode;
}> = ({ children, direction, showTail, showName, name }) => {
  if (direction === "info") {
    return <InfoBubble>{children}</InfoBubble>;
  }

  const isSent = direction === "sent";

  const determineBubble = () => {
    if (isSent) return <SentBubble showTail={showTail}>{children}</SentBubble>;

    if (showName)
      return (
        <NamedWrapper>
          <Name>{name || "A user"}</Name>
          <ReceivedBubble showTail={showTail}>{children}</ReceivedBubble>
        </NamedWrapper>
      );

    return <ReceivedBubble showTail={showTail}>{children}</ReceivedBubble>;
  };

  return <CloudWrapper sent={isSent}>{determineBubble()}</CloudWrapper>;
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
    height: 8px;
    width: 18px;
    background-color: ${colors.greenTealDark};
    right: 0px;
    bottom: -3px;
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
    height: 8px;
    width: 18px;
    background-color: ${colors.gray};
    /* background-color: red; */
    left: -1px;
    bottom: -3px;
    transform: skew(-20deg) rotate(-20deg);
  }
`;

const InfoBubble = styled(BaseBubble)`
  align-self: center;
  background-color: ${colors.gray};
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const NamedWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
`;

const Name = styled.span`
  color: gray;
  font-size: 13px;
  margin-bottom: 4px;
`;
