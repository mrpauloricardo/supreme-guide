package br.unifor.ead.management.repository;

import br.unifor.ead.management.entity.Subject;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SubjectRepository extends MongoRepository<Subject, String> {
    List<Subject> findByUserId(String userId);
}

