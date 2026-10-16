function Footer() {
  return (
    <footer className="mx-4 h-45.5 bg-[#111] italic">
      {/* justify-between nhin khong hop mat */}
      <div className="mx-auto flex h-full w-full max-w-235 justify-around pt-11">
        <div>
          <h3 className="mb-2.5 text-sm font-normal text-white">
            CUSTOMER SERVICES
          </h3>

          <ul className="space-y-0.5 text-[14px] leading-3.25 text-[#666]">
            <li>
              <a href="#">Help & Contact Us</a>
            </li>
            <li>
              <a href="#">Returns & Refunds</a>
            </li>
            <li>
              <a href="#">Online Stores</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2.5 text-sm font-normal text-white">COMPANY</h3>

          <ul className="space-y-0.5 text-[14px] leading-3.25 text-[#666]">
            <li>
              <a href="#">What We Do</a>
            </li>
            <li>
              <a href="#">Available Services</a>
            </li>
            <li>
              <a href="#">Latest Posts</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2.5 text-sm font-normal text-white">
            SOCIAL MEDIA
          </h3>

          <ul className="space-y-0.5 text-[14px] leading-3.25 text-[#666]">
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Pinterest</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
