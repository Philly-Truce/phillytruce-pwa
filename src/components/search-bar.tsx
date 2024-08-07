export default function SearchBar({ page }: { page: string }) {
  const placeholderText =
    page === "messages" ? "Search for messages" : "Search for reports";

  return (
    <div
      id="search-bar"
      className="flex items-center justify-between bg-accent rounded-[1.75rem] p-2 h-12"
    >
      {/* Magnifying Glass SVG */}
      <div className="flex items-center gap-5">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2002_11811)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.4152 24.0956L30.49 29.1704L29.1704 30.49L24.0956 25.4152C23.148 26.0972 22.0055 26.5134 20.7567 26.5134C17.5772 26.5134 15 23.9362 15 20.7567C15 17.5772 17.5772 15 20.7567 15C23.9362 15 26.5134 17.5772 26.5134 20.7567C26.5134 22.0055 26.0972 23.148 25.4152 24.0956ZM20.7567 16.7713C18.5515 16.7713 16.7713 18.5515 16.7713 20.7567C16.7713 22.962 18.5515 24.7421 20.7567 24.7421C22.962 24.7421 24.7421 22.962 24.7421 20.7567C24.7421 18.5515 22.962 16.7713 20.7567 16.7713Z"
              fill="#030D17"
              fillOpacity="0.6"
            />
          </g>
          <defs>
            <clipPath id="clip0_2002_11811">
              <rect x="4" y="4" width="40" height="40" rx="20" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <input
          type="text"
          placeholder={placeholderText}
          className="bg-transparent"
        />
      </div>
      {/* Mic SVG */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2002_11819)">
          <mask
            id="mask0_2002_11819"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="12"
            y="12"
            width="24"
            height="24"
          >
            <rect x="12" y="12" width="24" height="24" fill="#1C4587" />
          </mask>
          <g mask="url(#mask0_2002_11819)">
            <path
              d="M24 26C23.1667 26 22.4583 25.7083 21.875 25.125C21.2917 24.5417 21 23.8333 21 23V17C21 16.1667 21.2917 15.4583 21.875 14.875C22.4583 14.2917 23.1667 14 24 14C24.8333 14 25.5417 14.2917 26.125 14.875C26.7083 15.4583 27 16.1667 27 17V23C27 23.8333 26.7083 24.5417 26.125 25.125C25.5417 25.7083 24.8333 26 24 26ZM23 33V29.925C21.2667 29.6917 19.8333 28.9167 18.7 27.6C17.5667 26.2833 17 24.75 17 23H19C19 24.3833 19.4875 25.5625 20.4625 26.5375C21.4375 27.5125 22.6167 28 24 28C25.3833 28 26.5625 27.5125 27.5375 26.5375C28.5125 25.5625 29 24.3833 29 23H31C31 24.75 30.4333 26.2833 29.3 27.6C28.1667 28.9167 26.7333 29.6917 25 29.925V33H23ZM24 24C24.2833 24 24.5208 23.9042 24.7125 23.7125C24.9042 23.5208 25 23.2833 25 23V17C25 16.7167 24.9042 16.4792 24.7125 16.2875C24.5208 16.0958 24.2833 16 24 16C23.7167 16 23.4792 16.0958 23.2875 16.2875C23.0958 16.4792 23 16.7167 23 17V23C23 23.2833 23.0958 23.5208 23.2875 23.7125C23.4792 23.9042 23.7167 24 24 24Z"
              fill="#030D17"
              fillOpacity="0.6"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_2002_11819">
            <rect x="4" y="4" width="40" height="40" rx="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
