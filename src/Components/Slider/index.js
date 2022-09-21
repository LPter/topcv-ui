import './Slider.scss';
import React from 'react';
import { Carousel } from 'react-bootstrap';

function Slider() {
    return (
        <Carousel variant="dark" fade>
            <Carousel.Item interval={5000}>
                <h4 className="slider-title">Công cụ viết CV đẹp Miễn phí</h4>
                <p className="slider-caption">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                <img
                    className="d-block w-100 slider-img"
                    src="https://www.topcv.vn/v4/image/tool-cv.png"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <h4 className="slider-title">Bảo mật & An toàn tuyệt đối</h4>
                <p className="slider-caption">Bạn có thể chủ động bật / tắt trạng thái tìm việc.</p>
                <img
                    className="d-block w-100 slider-img"
                    src="https://www.topcv.vn/v4/image/sec-safe.png"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <h4 className="slider-title">Hỗ trợ Người tìm việc</h4>
                <p className="slider-caption">Nhà tuyển dụng chủ động tìm kiếm và liên hệ với bạn.</p>
                <img
                    className="d-block w-100 slider-img"
                    src="https://www.topcv.vn/v4/image/support.png"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default Slider;
