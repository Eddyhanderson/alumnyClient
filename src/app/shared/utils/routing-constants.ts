export class Routes {

    private static BASE_URL = "https://localhost:5001/api/v1/";
    public static BASE_URL_SERVER_FILE = "https://localhost:5001/";

    // Academy routes
    static ARTICLE_CREATE_ROUTE = Routes.BASE_URL + "article/create";
    static ARTICLE_UPDATE_ROUTE = Routes.BASE_URL + "article/update/{articleId}";
    static ARTICLE_GET_ALL_ROUTE = Routes.BASE_URL + "article/getAll";
    static ARTICLE_GET_ROUTE = Routes.BASE_URL + "article/get/{articleId}";

    // Answer routes
    static ANSWER_CREATE_ROUTE = Routes.BASE_URL + "answer/create";
    static ANSWER_GET_ALL_ROUTE = Routes.BASE_URL + "answer/getAll";
    static ANSWER_GET_ROUTE = Routes.BASE_URL + "answer/get/{answerId}";

    // User routes    
    static USER_LOGIN_ROUTE = Routes.BASE_URL + "user/login";
    static USER_GET_ROUTE = Routes.BASE_URL + "user/get/{id}";

    static USER_GET_STUDANT_ROUTE = Routes.BASE_URL + "user/get/studant/{id}";

    // SchoolCourse routes
    static SCHOOL_COURSE_CREATE_ROUTE = Routes.BASE_URL + "schoolCourse/create";
    static SCHOOL_COURSE_GET_ALL_ROUTE = Routes.BASE_URL + "schoolCourse/getAll";

    // School routes
    static SCHOOL_CREATE_ROUTE = Routes.BASE_URL + "school/create";
    static SCHOOL_GET_ROUTE = Routes.BASE_URL + "school/get/{id}"
    static SCHOOL_GET_ALL_ROUTE = Routes.BASE_URL + "school/getAll";
    static USER_GET_BY_USER_ROUTE = Routes.BASE_URL + "school/getByUser/{userId}";

    // Manager routes
    static MANAGER_CREATE_ROUTE = Routes.BASE_URL + "manager/create";
    static MANAGER_GET_BY_USER_ROUTE = Routes.BASE_URL + "manager/getByUser/{userId}";

    // Modules routes
    static MODULE_CREATE_ROUTE = Routes.BASE_URL + "module/create";
    static MODULE_GET_ALL_ROUTE = Routes.BASE_URL + "module/getAll";
    static MODULE_GET_ROUTE = Routes.BASE_URL + "module/get/{id}";

    // Organ routes
    static ORGAN_CREATE_ROUTE = Routes.BASE_URL + "organ/create";
    static ORGAN_GET_ALL_ROUTE = Routes.BASE_URL + "organ/getAll";
    static ORGAN_GET_ROUTE = Routes.BASE_URL + "organ/get/{id}";

    // Academy routes
    static ACADEMY_CREATE_ROUTE = Routes.BASE_URL + "academy/create";
    static ACADEMY_GET_ALL_ROUTE = Routes.BASE_URL + "academy/getAll";
    static ACADEMY_GET_ROUTE = Routes.BASE_URL + "academy/get/{id}";

    // Course routes    
    static COURSE_CREATE_ROUTE = Routes.BASE_URL + "course/create";
    static COURSE_GET_BY_NAME_ROUTE = Routes.BASE_URL + "course/get";
    static COURSE_GET_ALL_ROUTE = Routes.BASE_URL + "course/getAll";

    // Course routes    
    static DISCIPLINE_CREATE_ROUTE = Routes.BASE_URL + "discipline/create";
    static DISCIPLINE_GET_ALL_ROUTE = Routes.BASE_URL + "discipline/getAll";

    // Formation routes
    static FORMATION_CREATE_ROUTE = Routes.BASE_URL + "formation/create";
    static FORMATION_GET_ROUTE = Routes.BASE_URL + "formation/get/{id}";
    static FORMATION_GET_ALL_ROUTE = Routes.BASE_URL + "formation/getAll";
    static FORMATION_GET_ALL_PUBLISHED_ROUTE = Routes.BASE_URL + "formation/getAll/published";
    static FORMATION_GET_ALL_STUDANT_SUBSCRIBED_ROUTE = Routes.BASE_URL + "formation/getAll/subscribed";

    // Formation event routes
    static FORMATION_EVENT_CREATE_ROUTE = Routes.BASE_URL + "formationEvent/create";

    // Formation requests routes
    static FORMATION_REQUEST_CREATE_ROUTE = Routes.BASE_URL + "formationRequest/create";
    static FORMATION_REQUEST_GET_ROUTE = Routes.BASE_URL + "formationRequest/get/{studantId}/{formationId}";
    static FORMATION_REQUEST_GET_ALL_ROUTE = Routes.BASE_URL + "formationRequest/getAll";
    static FORMATION_REQUEST_APROVE_ROUTE = Routes.BASE_URL + "formationRequest/aprove/{id}";
    static FORMATION_REQUEST_PAY_ROUTE = Routes.BASE_URL + "formationRequest/pay/{id}";
    static FORMATION_REQUEST_CONFIRM_ROUTE = Routes.BASE_URL + "formationRequest/confirm/{id}";

    // Teacher routes
    static TEACHER_CREATE_ROUTE = Routes.BASE_URL + "teacher/create";
    static TEACHER_GET_ROUTE = Routes.BASE_URL + "teacher/get/{id}";
    static TEACHER_GET_ALL_ROUTE = Routes.BASE_URL + "teacher/getAll";

    // Studant routes
    static STUDANT_REGISTER_ROUTE = Routes.BASE_URL + "studant/create";
    static STUDANT_GET_ROUTE = Routes.BASE_URL + "studant/get/{id}";
    static STUDANT_GET_RESPONSABLE_ROUTE = Routes.BASE_URL + "studant/get/responsable/{id}";
    static STUDANT_GET_ALL_ROUTE = Routes.BASE_URL + "studant/getAll";

    // Subscription routes
    static SUBSCRIPTION_GET_ROUTE = Routes.BASE_URL + "subscription/get/{studantId}/{formationId}";
    static SUBSCRIPTION_GET_ALL_ROUTE = Routes.BASE_URL + "subscription/getAll";

    // TeacherSchools routes
    static TEACHER_SCHOOLS_CREATE_ROUTE = Routes.BASE_URL + "teacherSchools/create";
    static TEACHER_SCHOOLS_UPDATE_ROUTE = Routes.BASE_URL + "teacherSchools/update/{teacherId}/{schoolId}";
    static TEACHER_SCHOOLS_GET_ALL_ROUTE = Routes.BASE_URL + "teacherSchools/getAll";
    static TEACHER_SCHOOLS_CHECK_TEACHER_HAS_SCHOOL_ROUTE = Routes.BASE_URL + "teacherSchools/checkTeacherHasSchool/{teacherId}";

    // TeacherPlace studants routes
    static TEACHER_PLACE_STUDANTS_CREATE_ROUTE = Routes.BASE_URL + "teacherPlaceStudants/create";
    static TEACHER_PLACE_STUDANTS_UPDATE_ROUTE = Routes.BASE_URL + "teacherPlaceStudants/update/{teacherPlaceId}/{studantId}";
    static TEACHER_PLACE_STUDANTS_GET_ALL_ROUTE = Routes.BASE_URL + "teacherPlaceStudants/getAll";
    static TEACHER_PLACE_STUDANTS_GET_ROUTE = Routes.BASE_URL + "teacherPlaceStudants/get/{teacherPlaceId}/{studantId}";

    // TeacherPlace routes
    static TEACHER_PLACE_CREATE_ROUTE = Routes.BASE_URL + "teacherPlace/create";
    static TEACHER_PLACE_GET_ALL_ROUTE = Routes.BASE_URL + "teacherPlace/getAll";
    static TEACHER_PLACE_GET_ROUTE = Routes.BASE_URL + "teacherPlace/get/{teacherPlaceId}";

    // Video routes
    static VIDEO_UPLOAD_ROUTE = Routes.BASE_URL + "video/upload";

    // Images Uploads routes
    static IMAGE_UPLOAD_LESSON_PROFILE = Routes.BASE_URL + "image/upload/lesson/profile";
    static IMAGE_UPLOAD_TOPIC = Routes.BASE_URL + "image/upload/topic";
    static IMAGE_UPLOAD_MODULE = Routes.BASE_URL + "image/upload/module";
    static IMAGE_UPLOAD_FORMATION = Routes.BASE_URL + "image/upload/formation";


    // Lesson routes
    static LESSON_CREATE_ROUTE = Routes.BASE_URL + "lesson/create";
    static LESSON_GET_ALL_ROUTE = Routes.BASE_URL + "lesson/getAll";
    static LESSON_GET_ROUTE = Routes.BASE_URL + "lesson/get/{lessonId}";

    // TeacherPlace routes  
    static POST_CREATE_ROUTE = Routes.BASE_URL + "post/create";
    static POST_GET_ROUTE = Routes.BASE_URL + "post/get/{postId}";


    // Discipline topics routes
    static DISCIPLINE_TOPIC_CREATE_ROUTE = Routes.BASE_URL + "disciplineTopic/create";
    static DISCIPLINE_TOPIC_GET_ALL_ROUTE = Routes.BASE_URL + "disciplineTopic/getAll";

    // Topics routes
    static TOPIC_CREATE_ROUTE = Routes.BASE_URL + "topic/create";
    static TOPIC_GET_ALL_ROUTE = Routes.BASE_URL + "topic/getAll";
    static TOPIC_GET_ROUTE = Routes.BASE_URL + "topic/get/{topicId}";

    // Question routes
    static QUESTION_CREATE_ROUTE = Routes.BASE_URL + "question/create";
    static QUESTION_GET_ROUTE = Routes.BASE_URL + "question/get/{questionId}";
    static QUESTION_GET_ALL_ROUTE = Routes.BASE_URL + "question/getAll";
    static QUESTION_PATCH_ROUTE = Routes.BASE_URL + "question/patch/{questionId}";

    // Comment router    
    static COMMENT_CREATE_ROUTE = Routes.BASE_URL + "comment/create";
    static COMMENT_GET_ALL_ROUTE = Routes.BASE_URL + "comment/getAll";
    static COMMENT_GET_ROUTE = Routes.BASE_URL + "comment/get/{commentId}";

    // Certificate
    static CERTIFICATE_CREATE_ROUTE = Routes.BASE_URL + "certificate/create";
    static CERTIFICATE_GET_BY_SUBSCRIPTION_ROUTE = Routes.BASE_URL + "certificate/getBySubscription/{subscriptionId}";

    // SignalR routes
    static VIDEO_UPLOAD_WATCH = Routes.BASE_URL + "video/upload/watch/{connectionId}";
}