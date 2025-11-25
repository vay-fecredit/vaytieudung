import os

class CodingExpertAgent:
    def __init__(self, model_client=None):
        """
        Khởi tạo tác nhân Chuyên gia Lập trình.
        
        Tham số:
        - model_client: Đối tượng kết nối với LLM (ví dụ: OpenAI, Anthropic client).
                        Nếu không có, hàm run() sẽ trả về giả lập để test.
        """
        self.client = model_client
        
        # --- ĐÂY LÀ TRÁI TIM CỦA TÁC NHÂN ---
        # Nội dung này định nghĩa "Chuyên gia lập trình" là ai.
        self.system_instructions = """
        VAI TRÒ:
        Bạn là một Kỹ sư phần mềm cao cấp (Senior Software Engineer) và là một người cố vấn kiên nhẫn.
        
        MỤC TIÊU:
        Hỗ trợ người dùng viết mã, gỡ lỗi (debug), tái cấu trúc mã (refactor) và giải thích các khái niệm kỹ thuật phức tạp.

        NGUYÊN TẮC CỐT LÕI:
        1. Chất lượng mã:
           - Viết mã sạch (Clean Code), tuân thủ chuẩn mực (PEP8 cho Python, v.v.).
           - Luôn xử lý các trường hợp lỗi (Error Handling).
           - Tên biến và hàm phải rõ nghĩa.
        
        2. Tính sư phạm:
           - Đừng chỉ đưa mã. Hãy giải thích TẠI SAO bạn viết như vậy.
           - Sử dụng comment trong mã để giải thích các dòng phức tạp.
           - Nếu mã của người dùng có lỗ hổng bảo mật, hãy cảnh báo ngay lập tức.

        3. Định dạng câu trả lời:
           - Luôn sử dụng Markdown cho mã (ví dụ: ```python ... ```).
           - Chia câu trả lời thành: Phân tích vấn đề -> Giải pháp -> Mã nguồn -> Giải thích.

        GIỚI HẠN:
        - Chỉ trả lời các câu hỏi liên quan đến Công nghệ và Lập trình.
        - Nếu người dùng hỏi về chủ đề khác, hãy lịch sự từ chối và quay lại chủ đề code.
        """

    def run(self, user_query):
        """
        Hàm xử lý yêu cầu từ người dùng.
        """
        # Tạo ngữ cảnh (Context) gửi cho AI
        messages = [
            {"role": "system", "content": self.system_instructions},
            {"role": "user", "content": user_query}
        ]

        # --- KẾT NỐI VỚI MÔ HÌNH THỰC TẾ ---
        if self.client:
            # Giả sử dùng OpenAI API
            try:
                response = self.client.chat.completions.create(
                    model="gpt-4",
                    messages=messages,
                    temperature=0.2 # Thấp để code chính xác, ít sáng tạo lan man
                )
                return response.choices[0].message.content
            except Exception as e:
                return f"Lỗi kết nối API: {e}"
        
        # --- GIẢ LẬP (Nếu chưa có API Key) ---
        else:
            return self._mock_response(user_query)

    def _mock_response(self, query):
        """Hàm giả lập câu trả lời để test khi chưa nối API"""
        return f"""
        [MÔ PHỎNG TRẢ LỜI CỦA CHUYÊN GIA]
        Chào bạn, tôi đã nhận được yêu cầu: "{query}"
        
        Vì chưa kết nối API thực tế, tôi sẽ đưa ra ví dụ mẫu:
        Để in ra màn hình trong Python, bạn dùng lệnh:
        ```python
        print("Hello World")
        ```
        """

# --- HƯỚNG DẪN SỬ DỤNG ---
if __name__ == "__main__":
    # Bước 1: Khởi tạo tác nhân (Để trống client để test thử)
    agent = CodingExpertAgent(model_client=None)
    
    # Bước 2: Đặt câu hỏi
    cau_hoi = "Viết giúp tôi hàm tính giai thừa bằng đệ quy trong Python"
    
    # Bước 3: Nhận phản hồi
    print("Người dùng:", cau_hoi)
    print("-" * 50)
    phan_hoi = agent.run(cau_hoi)
    print(phan_hoi)
