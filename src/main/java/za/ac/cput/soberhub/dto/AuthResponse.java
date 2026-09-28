package za.ac.cput.soberhub.dto;

public class AuthResponse {
    private String token;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String membershipStatus;

    public AuthResponse(String token, String firstName, String lastName,
                        String email, String role, String membershipStatus) {
        this.token = token;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.membershipStatus = membershipStatus;
    }

    public String getToken() { return token; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getMembershipStatus() { return membershipStatus; }
}
