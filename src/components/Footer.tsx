import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      id="page-footer"
      key="page-footer"
      className="mt-12 flex w-full flex-col justify-center px-4 py-8 backdrop-brightness-110"
    >
      <div
        id="socials"
        className="mx-auto mb-4 flex w-1/4 justify-center gap-4"
      >
        <Link
          href={'https://github.com/tsimmz'}
          target="_blank"
          className="group flex aspect-square w-12 place-items-center  rounded-xl p-2 transition-transform duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125"
        >
          <svg
            viewBox="0 0 24 24"
            className="fill-rose-300 group-hover:fill-rose-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z" />
          </svg>
        </Link>
        <Link
          href={'https://linkedin.com/in/tylersimoni'}
          target="_blank"
          className="group flex aspect-square w-12 place-items-center  rounded-xl p-2 transition-all duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125"
        >
          <svg
            viewBox="0 0 24 24"
            className="fill-rose-300 group-hover:fill-rose-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.70553 0.00601196C2.12033 0.00601196 0.00448608 2.1218 0.00448608 4.70706V19.2952C0.00448608 21.8805 2.12028 23.9955 4.70553 23.9955H19.2937C21.879 23.9955 23.994 21.8805 23.994 19.2952V4.70706C23.994 2.12185 21.879 0.00601196 19.2937 0.00601196H4.70553ZM5.88792 3.96476C7.12747 3.96476 7.89098 4.77851 7.91455 5.84816C7.91455 6.8942 7.12742 7.73082 5.86394 7.73082H5.84069C4.62473 7.73082 3.8388 6.89425 3.8388 5.84816C3.8388 4.77853 4.64851 3.96476 5.88789 3.96476H5.88792ZM16.5698 8.9642C18.9537 8.9642 20.7408 10.5223 20.7408 13.8707V20.1214H17.1179V14.2898C17.1179 12.8243 16.5936 11.8245 15.2825 11.8245C14.2816 11.8245 13.685 12.4984 13.4231 13.1494C13.3274 13.3823 13.3039 13.7075 13.3039 14.0333V20.1214H9.681C9.681 20.1214 9.72854 10.2427 9.681 9.21985H13.3046V10.7636C13.7861 10.0208 14.6472 8.96418 16.5698 8.96418V8.9642ZM4.05249 9.22064H7.67537V20.1215H4.05249V9.22064Z" />
          </svg>
        </Link>
        <Link
          href={'http://instagram.com/t_simmz'}
          target="_blank"
          className="group flex aspect-square w-12 place-items-center rounded-xl p-2 transition-transform duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125"
        >
          <svg
            viewBox="0 0 24 24"
            className="fill-rose-300 group-hover:fill-rose-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C8.7435 0 8.334 0.015 7.0545 0.072C5.775 0.132 4.9035 0.333 4.14 0.63C3.33914 0.931229 2.61374 1.40374 2.0145 2.0145C1.40411 2.61404 0.931661 3.33936 0.63 4.14C0.333 4.902 0.1305 5.775 0.072 7.05C0.015 8.3325 0 8.7405 0 12.0015C0 15.2595 0.015 15.6675 0.072 16.947C0.132 18.225 0.333 19.0965 0.63 19.86C0.9375 20.649 1.347 21.318 2.0145 21.9855C2.6805 22.653 3.3495 23.064 4.1385 23.37C4.9035 23.667 5.7735 23.8695 7.0515 23.928C8.3325 23.985 8.7405 24 12 24C15.2595 24 15.666 23.985 16.947 23.928C18.2235 23.868 19.098 23.667 19.8615 23.37C20.6618 23.0686 21.3867 22.5961 21.9855 21.9855C22.653 21.318 23.0625 20.649 23.37 19.86C23.6655 19.0965 23.868 18.225 23.928 16.947C23.985 15.6675 24 15.2595 24 12C24 8.7405 23.985 8.3325 23.928 7.0515C23.868 5.775 23.6655 4.902 23.37 4.14C23.0684 3.33934 22.5959 2.61401 21.9855 2.0145C21.3864 1.40351 20.661 0.930968 19.86 0.63C19.095 0.333 18.222 0.1305 16.9455 0.072C15.6645 0.015 15.258 0 11.997 0H12.0015H12ZM10.9245 2.163H12.0015C15.2055 2.163 15.585 2.1735 16.8495 2.232C18.0195 2.2845 18.6555 2.481 19.0785 2.6445C19.638 2.862 20.0385 3.123 20.4585 3.543C20.8785 3.963 21.138 4.362 21.3555 4.923C21.5205 5.3445 21.7155 5.9805 21.768 7.1505C21.8265 8.415 21.8385 8.7945 21.8385 11.997C21.8385 15.1995 21.8265 15.5805 21.768 16.845C21.7155 18.015 21.519 18.6495 21.3555 19.0725C21.1631 19.5935 20.856 20.0647 20.457 20.451C20.037 20.871 19.638 21.1305 19.077 21.348C18.657 21.513 18.021 21.708 16.8495 21.762C15.585 21.819 15.2055 21.8325 12.0015 21.8325C8.7975 21.8325 8.4165 21.819 7.152 21.762C5.982 21.708 5.3475 21.513 4.9245 21.348C4.40325 21.1559 3.93169 20.8494 3.5445 20.451C3.14513 20.0641 2.83758 19.5925 2.6445 19.071C2.481 18.6495 2.2845 18.0135 2.232 16.8435C2.175 15.579 2.163 15.1995 2.163 11.994C2.163 8.79 2.175 8.412 2.232 7.1475C2.286 5.9775 2.481 5.3415 2.646 4.9185C2.8635 4.359 3.1245 3.9585 3.5445 3.5385C3.9645 3.1185 4.3635 2.859 4.9245 2.6415C5.3475 2.4765 5.982 2.2815 7.152 2.2275C8.259 2.1765 8.688 2.1615 10.9245 2.16V2.163ZM18.4065 4.155C18.2174 4.155 18.0301 4.19225 17.8554 4.26461C17.6807 4.33698 17.522 4.44305 17.3883 4.57677C17.2545 4.71048 17.1485 4.86923 17.0761 5.04394C17.0037 5.21864 16.9665 5.4059 16.9665 5.595C16.9665 5.7841 17.0037 5.97135 17.0761 6.14606C17.1485 6.32077 17.2545 6.47952 17.3883 6.61323C17.522 6.74695 17.6807 6.85302 17.8554 6.92539C18.0301 6.99775 18.2174 7.035 18.4065 7.035C18.7884 7.035 19.1547 6.88329 19.4247 6.61323C19.6948 6.34318 19.8465 5.97691 19.8465 5.595C19.8465 5.21309 19.6948 4.84682 19.4247 4.57677C19.1547 4.30671 18.7884 4.155 18.4065 4.155ZM12.0015 5.838C11.1841 5.82525 10.3723 5.97523 9.61347 6.27921C8.85459 6.58319 8.16377 7.03511 7.58123 7.60863C6.99868 8.18216 6.53605 8.86585 6.22026 9.61989C5.90448 10.3739 5.74185 11.1833 5.74185 12.0007C5.74185 12.8182 5.90448 13.6276 6.22026 14.3816C6.53605 15.1356 6.99868 15.8193 7.58123 16.3929C8.16377 16.9664 8.85459 17.4183 9.61347 17.7223C10.3723 18.0263 11.1841 18.1763 12.0015 18.1635C13.6193 18.1383 15.1623 17.4779 16.2975 16.3249C17.4326 15.1719 18.0689 13.6188 18.0689 12.0007C18.0689 10.3827 17.4326 8.82962 16.2975 7.67662C15.1623 6.52363 13.6193 5.86324 12.0015 5.838ZM12.0015 7.9995C13.0625 7.9995 14.08 8.42098 14.8303 9.17122C15.5805 9.92146 16.002 10.939 16.002 12C16.002 13.061 15.5805 14.0785 14.8303 14.8288C14.08 15.579 13.0625 16.0005 12.0015 16.0005C10.9405 16.0005 9.92296 15.579 9.17272 14.8288C8.42248 14.0785 8.001 13.061 8.001 12C8.001 10.939 8.42248 9.92146 9.17272 9.17122C9.92296 8.42098 10.9405 7.9995 12.0015 7.9995Z" />
          </svg>
        </Link>
        <Link
          href={'https://twitter.com/tylersimoni'}
          target="_blank"
          className="group flex aspect-square w-12 place-items-center rounded-xl p-2  transition-transform duration-200 ease-in-out hover:translate-y-[-8px] hover:scale-110 hover:backdrop-brightness-125"
        >
          <svg
            viewBox="0 0 24 19"
            className="fill-rose-300 group-hover:fill-rose-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.539 19.5C16.596 19.5 21.5505 11.9955 21.5505 5.499C21.5505 5.289 21.5505 5.076 21.5415 4.866C22.5061 4.16773 23.3386 3.30323 24 2.313C23.099 2.71028 22.1441 2.97211 21.1665 3.09C22.1963 2.47446 22.9676 1.50595 23.337 0.364502C22.3695 0.937688 21.3105 1.34006 20.2065 1.554C19.4643 0.763538 18.4821 0.239879 17.4121 0.0641383C16.3421 -0.111602 15.2441 0.0703843 14.288 0.581908C13.3319 1.09343 12.5712 1.90595 12.1237 2.89359C11.6761 3.88124 11.5668 4.9889 11.8125 6.045C9.85461 5.94683 7.93922 5.4382 6.19056 4.55212C4.4419 3.66603 2.89903 2.42227 1.662 0.901502C1.03401 1.98613 0.842361 3.2691 1.12597 4.4899C1.40958 5.7107 2.14718 6.7778 3.189 7.4745C2.40831 7.44798 1.64478 7.23834 0.96 6.8625V6.93C0.961346 8.06622 1.35496 9.16713 2.07431 10.0466C2.79366 10.9262 3.79462 11.5303 4.908 11.757C4.48539 11.8734 4.04884 11.9315 3.6105 11.9295C3.30148 11.9304 2.99307 11.9018 2.6895 11.844C3.00418 12.8221 3.61691 13.6773 4.44187 14.2897C5.26683 14.9022 6.2627 15.2413 7.29 15.2595C5.54483 16.6302 3.3891 17.3736 1.17 17.37C0.778981 17.3717 0.388235 17.3491 0 17.3025C2.25227 18.7384 4.86795 19.5008 7.539 19.5Z" />
          </svg>
        </Link>
      </div>
      <p className="text-center text-sm text-slate-100">
        Tyler Simoni{' '}
        <span className="text-rose-300">&copy;{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};

export default Footer;
