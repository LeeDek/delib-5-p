export default function QuestionMarkIcon({ color }: { color: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M17.8333 9.41667C17.8333 7.98008 17.2626 6.60233 16.2468 5.5865C15.231 4.57068 13.8533 4 12.4167 4C10.9801 4 9.60233 4.57068 8.5865 5.5865C7.57068 6.60233 7 7.98008 7 9.41667C7 9.70398 7.11414 9.97953 7.3173 10.1827C7.52047 10.3859 7.79602 10.5 8.08333 10.5C8.37065 10.5 8.6462 10.3859 8.84937 10.1827C9.05253 9.97953 9.16667 9.70398 9.16667 9.41667C9.16667 8.77388 9.35728 8.14552 9.71439 7.61106C10.0715 7.0766 10.5791 6.66004 11.1729 6.41406C11.7668 6.16807 12.4203 6.10371 13.0507 6.22911C13.6811 6.35452 14.2602 6.66405 14.7148 7.11857C15.1693 7.57309 15.4788 8.15218 15.6042 8.78262C15.7296 9.41306 15.6653 10.0665 15.4193 10.6604C15.1733 11.2542 14.7567 11.7618 14.2223 12.1189C13.6878 12.4761 13.0595 12.6667 12.4167 12.6667C12.1293 12.6667 11.8538 12.7808 11.6506 12.984C11.4475 13.1871 11.3333 13.4627 11.3333 13.75L11.3333 15.9167C11.3333 16.204 11.4475 16.4795 11.6506 16.6827C11.8538 16.8859 12.1293 17 12.4167 17C12.704 17 12.9795 16.8859 13.1827 16.6827C13.3859 16.4795 13.5 16.204 13.5 15.9167L13.5 14.725C14.7235 14.4753 15.8231 13.8105 16.6127 12.8431C17.4024 11.8758 17.8336 10.6654 17.8333 9.41667Z"
                fill={color}
            />
            <path
                d="M12.5 20C13.0523 20 13.5 19.5523 13.5 19C13.5 18.4477 13.0523 18 12.5 18C11.9477 18 11.5 18.4477 11.5 19C11.5 19.5523 11.9477 20 12.5 20Z"
                fill={color}
            />
        </svg>
    );
}
