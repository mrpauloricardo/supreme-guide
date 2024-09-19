package br.unifor.ead.management.controller;

import br.unifor.ead.management.entity.Subject;
import br.unifor.ead.management.repository.SubjectRepository;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subjects")
public class SubjectController {

    private final SubjectRepository subjectRepository;

    public SubjectController(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    // Listar os subjects do usuário autenticado
    @GetMapping
    public List<Subject> getSubjectsByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName(); // Assumindo que o nome é o email ou ID único
        return subjectRepository.findByUserId(userId);
    }

    // Criar um novo subject
    @PostMapping
    public Subject createSubject(@Valid @RequestBody Subject subject) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName(); // Assumindo que o email ou username é usado como ID
        subject.setUserId(userId); // Associa o Subject ao usuário logado
        return subjectRepository.save(subject);
    }
}

