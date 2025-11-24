# Required Information to Proceed

This document outlines the initial details needed to move forward with improvements, bug fixes, or new features in the Shinhan Finance Consumer Loan Platform repository.

## Project Overview

**Repository**: shinhanfinancer/vaytieudung
**Current Version**: 1.0.0
**Main Application**: Consumer loan webpage with eKYC (electronic Know Your Customer) functionality

## Current State Assessment

### ✅ Working Components
- **Tests**: All 67 tests passing across 4 test suites
- **Dependencies**: Successfully installed (750 packages)
- **Core Functionality**: 
  - Consumer loan application forms
  - eKYC integration with VNPT SDK
  - Multilingual support (Vietnamese/English)
  - Service worker for offline access
  - Responsive design for mobile and desktop

### ⚠️ Issues Identified
- **Linting**: ESLint configuration file is missing
- **Build Process**: No clear build script defined for production
- **Documentation**: Limited technical documentation for developers

## Required Information by Category

### 1. Feature Requests & Enhancements

Please provide details for any new features or enhancements needed:

- [ ] **Feature Description**: What new functionality is required?
- [ ] **Business Justification**: Why is this feature needed?
- [ ] **User Stories**: Who will use this feature and how?
- [ ] **Priority Level**: Critical / High / Medium / Low
- [ ] **Dependencies**: What other systems or components does this depend on?
- [ ] **Expected Timeline**: When is this needed?

### 2. Bug Reports & Issues

For any bugs or issues that need to be addressed:

- [ ] **Bug Description**: What is the current incorrect behavior?
- [ ] **Steps to Reproduce**: How can we recreate the issue?
- [ ] **Expected Behavior**: What should happen instead?
- [ ] **Environment**: Browser, OS, device details
- [ ] **Impact**: How many users are affected?
- [ ] **Severity**: Critical / High / Medium / Low
- [ ] **Screenshots/Logs**: Any supporting evidence

### 3. Technical Improvements

For code quality, performance, or infrastructure improvements:

- [ ] **Code Quality**:
  - ESLint configuration needed?
  - Code refactoring requirements?
  - Technical debt to address?

- [ ] **Performance**:
  - Page load time concerns?
  - API response time issues?
  - Resource optimization needed?

- [ ] **Security**:
  - Security vulnerabilities identified?
  - Authentication/authorization improvements?
  - Data protection enhancements?

- [ ] **Testing**:
  - Additional test coverage needed?
  - E2E testing requirements?
  - Performance testing needed?

### 4. Integration Requirements

For third-party integrations or API updates:

- [ ] **Banking APIs**: Payment gateways, loan processing systems
- [ ] **eKYC Providers**: VNPT SDK updates or alternatives
- [ ] **Communication Services**: Email (Nodemailer), SMS (Twilio)
- [ ] **Analytics**: Tracking and monitoring tools
- [ ] **Other Integrations**: Specify service and purpose

### 5. Deployment & Infrastructure

For deployment and hosting considerations:

- [ ] **Hosting Environment**: Where will this be deployed?
- [ ] **CI/CD Pipeline**: Automation requirements?
- [ ] **Monitoring**: Error tracking, performance monitoring
- [ ] **Backup & Recovery**: Data backup strategy
- [ ] **Scaling**: Expected traffic and scaling needs

### 6. Compliance & Regulatory

For banking and financial compliance:

- [ ] **Banking Standards**: Specific regulations to comply with
- [ ] **Data Privacy**: GDPR, local data protection laws
- [ ] **Accessibility**: WCAG compliance level required
- [ ] **Security Standards**: PCI DSS, ISO certifications
- [ ] **Audit Requirements**: Logging and audit trails

### 7. Documentation Needs

What documentation is required:

- [ ] **User Documentation**: End-user guides, FAQs
- [ ] **Developer Documentation**: API docs, setup guides
- [ ] **Deployment Guides**: Installation and configuration
- [ ] **Architecture Diagrams**: System design documentation
- [ ] **Security Documentation**: Security policies and procedures

## How to Provide Information

### For Development Team
1. Create sub-issues for each category that applies
2. Use the templates in `.github/ISSUE_TEMPLATE/`
3. Link sub-issues to this parent issue
4. Prioritize and assign owners to each sub-issue

### For Stakeholders
1. Review the categories above
2. Provide detailed information for relevant sections
3. Include business context and justification
4. Specify timelines and priorities
5. Identify key decision makers and approvers

## Next Steps

Once sufficient information is gathered:

1. **Prioritize**: Rank issues and features by impact and urgency
2. **Plan**: Create detailed implementation plans
3. **Estimate**: Provide time and resource estimates
4. **Execute**: Begin development work
5. **Review**: Regular progress reviews and adjustments

## Contact & Support

For questions or clarifications:
- **Email**: shinhanvietnam@shinhan.com
- **Hotline**: 1900 1577
- **Repository**: https://github.com/shinhanfinancer/vaytieudung

---

*Last Updated*: 2025-11-19
*Document Owner*: Development Team
